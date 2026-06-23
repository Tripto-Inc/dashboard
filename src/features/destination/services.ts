import { prisma } from '@/lib/prisma';
import { Destination, DestinationFormData } from '@/features/destination/types';
import { DESTINATION_ERRORS } from '@/features/destination/constants';

export class DestinationService {
  static async findById(id: string): Promise<Destination> {
    const destination = await prisma.destination.findUnique({
      where: { id },
    });

    if (!destination) {
      throw new Error(DESTINATION_ERRORS.NOT_FOUND);
    }

    return destination;
  }

  static async findAll(params: {
    page: number;
    pageSize: number;
    filter?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const skip = (params.page - 1) * params.pageSize;

    const where = params.filter
      ? {
          OR: [
            { city: { contains: params.filter, mode: 'insensitive' as const } },
            { country: { contains: params.filter, mode: 'insensitive' as const } },
            { slogan: { contains: params.filter, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const orderBy = params.sortBy
      ? { [params.sortBy]: params.sortOrder || 'asc' }
      : { createdAt: 'desc' as const };

    const [data, total] = await Promise.all([
      prisma.destination.findMany({
        where,
        orderBy,
        skip,
        take: params.pageSize,
      }),
      prisma.destination.count({ where }),
    ]);

    return { data, total };
  }

  static async create(data: DestinationFormData, userId: string) {
    const existing = await prisma.destination.findUnique({
      where: {
        country_city_slogan: {
          city: data.city,
          slogan: data.slogan,
          country: data.country,
        },
      },
    });

    if (existing) {
      throw new Error(DESTINATION_ERRORS.DUPLICATE_LOCATION_SLOGAN);
    }

    const hasAccommodation = await prisma.accommodation.findFirst({
      where: {
        address: {
          city: data.city,
          country: data.country,
        },
      },
    });

    if (!hasAccommodation) {
      throw new Error(DESTINATION_ERRORS.NO_ACCOMMODATION_IN_LOCATION);
    }

    return prisma.destination.create({
      data: {
        ...data,
        createdById: userId,
      },
    });
  }

  static async update(id: string, data: DestinationFormData, userId: string) {
    const existing = await prisma.destination.findUnique({ where: { id } });

    if (!existing) {
      throw new Error(DESTINATION_ERRORS.NOT_FOUND);
    }

    return prisma.destination.update({
      where: { id },
      data: {
        ...data,
        updatedById: userId,
        updatedAt: new Date(),
      },
    });
  }

  static async delete(id: string) {
    const existing = await prisma.destination.findUnique({ where: { id } });

    if (!existing) {
      throw new Error(DESTINATION_ERRORS.NOT_FOUND);
    }

    return prisma.destination.delete({ where: { id } });
  }
}
