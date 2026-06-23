import { PageBreadcrumb } from '@/components/shared/PageBreadcrumb';
import { DestinationForm } from '@/features/destination';
import { prisma } from '@/lib/prisma';
import { DestinationService } from '@/features/destination/services';

interface DestinationParams {
  id: string;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<DestinationParams>;
}): Promise<{ title: string }> => {
  const { id } = await params;
  const { country, city } = await DestinationService.findById(id);
  return { title: `${country}, ${city}` };
};

const DestinationEditPage = async ({ params }: { params: Promise<DestinationParams> }) => {
  const { id } = await params;
  const destination = await DestinationService.findById(id);

  const houses = await prisma.house.findMany({
    where: {
      accommodation: {
        destination: {
          seasons: {
            has: 'SPRING',
          },
        },
      },
    },
    include: {
      accommodation: true,
    },
  });

  const rooms = await prisma.room.findMany({
    where: {
      hotel: {
        accommodation: {
          destination: {
            seasons: {
              has: 'SPRING',
            },
          },
        },
      },
    },
    include: {
      hotel: {
        include: {
          accommodation: true,
        },
      },
    },
  });

  const units = [
    ...houses.map((house) => ({
      type: 'HOUSE' as const,
      price: house.price,
      house,
    })),
    ...rooms.map((room) => ({
      type: 'ROOM' as const,
      price: room.price,
      room,
    })),
  ]
    .sort((a, b) => a.price - b.price)
    .slice(0, 4);

  console.log(units);

  return (
    <article className="mx-auto">
      <PageBreadcrumb
        pages={[
          {
            route: '/destinations',
            title: 'Destinations',
          },
        ]}
        className="mb-5"
        currentPageTitle={`${destination.country}, ${destination.city}`}
      />
      <DestinationForm initialData={destination} />
    </article>
  );
};

export default DestinationEditPage;
