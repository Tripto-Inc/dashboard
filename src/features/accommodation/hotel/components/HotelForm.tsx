'use client';

import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DOCUMENT_QUERY_KEYS } from '@/features/document/constants';
import { queryClient } from '@/lib/query-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconDeviceFloppy, IconInfoCircle } from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useMemo } from 'react';
import { Controller, FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { AccommodationAmenity, AccommodationPolicy } from '@/features/accommodation';
import { AccommodationLocationSkeleton } from '../../components/location/AccommodationLocationSkeleton';
import { useCreateHotel } from '../hooks/useCreateHotel';
import { useUpdateHotel } from '../hooks/useUpdateHotel';
import { hotelSchema, HotelSchema } from '../schema/hotel';
import { HotelFormProps } from '../types/hotelForm';
import { AccommodationRoom } from './room/AccommodationRoom';
import { AccommodationGallery } from '@/features/accommodation/components/gallery/AccommodationGallery';

const AccommodationLocation = dynamic(
  () =>
    import('../../components/location/AccommodationLocation').then(
      (module) => module.AccommodationLocation,
    ),
  {
    ssr: false,
    loading: () => <AccommodationLocationSkeleton />,
  },
);

export const HotelForm: FC<HotelFormProps> = ({ initialData }) => {
  const router = useRouter();
  const isEditMode = Boolean(initialData?.id);
  const createHotelMutation = useCreateHotel();
  const updateHotelMutation = useUpdateHotel();

  const isSubmitting = updateHotelMutation.isPending || createHotelMutation.isPending;

  const form = useForm<HotelSchema>({
    mode: 'onChange',
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      title: '',
      description: '',
      country: '',
      countryCode: '',
      city: '',
      addressDetails: '',
      latitude: undefined,
      longitude: undefined,
      heroImage: undefined,
      galleryImages: [],

      rooms: [],
      amenities: [],
      policies: [],
    },
  });

  const {
    reset,
    control,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        ...initialData.address,
        addressDetails: initialData.address.details,
        rooms: JSON.parse(JSON.stringify(initialData.hotel?.rooms)),
        policies: JSON.parse(JSON.stringify(initialData.policies)),
        amenities: JSON.parse(JSON.stringify(initialData.amenities)),
      });
    }
  }, [initialData, reset]);

  const submitButtonLabel = useMemo(() => {
    if (isSubmitting) {
      return isEditMode ? 'Updating...' : 'Creating...';
    }

    return isEditMode ? 'Update Hotel' : 'Create Hotel';
  }, [isEditMode, isSubmitting]);

  const [latitude, longitude] = useWatch({
    control,
    name: ['latitude', 'longitude'],
  });

  const {
    fields: roomFields,
    append: appendRoom,
    remove: removeRoom,
    update: updateRoom,
  } = useFieldArray({
    name: 'rooms',
    control: control,
    keyName: 'fieldId',
  });

  const {
    fields: amenityFields,
    append: appendAmenity,
    remove: removeAmenity,
    update: updateAmenity,
  } = useFieldArray({
    control: control,
    name: 'amenities',
  });

  const {
    fields: policyFields,
    append: appendPolicy,
    remove: removePolicy,
    update: updatePolicy,
  } = useFieldArray({
    control: control,
    name: 'policies',
  });

  const onSubmit = async (formData: HotelSchema) => {
    const { heroImage, galleryImages, ...data } = formData;
    const rooms = data.rooms.map(({ galleryImages, ...otherData }) => otherData);
    const roomsGalleryImages = data.rooms.map(
      ({ galleryImages }) => galleryImages?.filter((image) => image != null) || [],
    );

    if (initialData?.id) {
      await updateHotelMutation.mutateAsync({
        id: initialData.id,
        data: {
          ...data,
          rooms,
          latitude: data.latitude as number,
          longitude: data.longitude as number,
        },
        heroImage,
        galleryImages,
        roomsGalleryImages,
      });

      queryClient.invalidateQueries({
        queryKey: DOCUMENT_QUERY_KEYS.document({
          category: 'hero',
          id: initialData.id,
          bucket: 'accommodations',
        }),
      });
      queryClient.invalidateQueries({
        queryKey: DOCUMENT_QUERY_KEYS.document({
          id: initialData.id,
          category: 'gallery',
          bucket: 'accommodations',
        }),
      });
      queryClient.invalidateQueries({
        queryKey: DOCUMENT_QUERY_KEYS.document({
          bucket: 'accommodations',
          category: 'roomGallery',
        }),
      });
    } else {
      await createHotelMutation.mutateAsync({
        data: {
          ...data,
          rooms,
          latitude: data.latitude as number,
          longitude: data.longitude as number,
        },
        heroImage,
        galleryImages,
        roomsGalleryImages,
      });

      router.push('/accommodations');
    }
  };

  console.log(form.formState.errors);

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ButtonPrimary
          size="lg"
          type="submit"
          className="absolute -top-18 right-0"
          disabled={isSubmitting}
          endIcon={<IconDeviceFloppy className="size-5" />}
        >
          {submitButtonLabel}
        </ButtonPrimary>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <ModificationFormSection icon={IconInfoCircle} title="General Information">
              <div className="grid grid-cols-1 gap-x-6">
                <FieldWithError
                  required
                  htmlFor="title"
                  label="Title"
                  error={errors.title?.message}
                >
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="title"
                        {...field}
                        aria-label='Hotel Title'
                        placeholder="Enter a title"
                        aria-invalid={!!errors.title?.message}
                      />
                    )}
                  />
                </FieldWithError>

                <FieldWithError
                  required
                  htmlFor="description"
                  label="Description"
                  error={errors.description?.message}
                >
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        id="description"
                        {...field}
                        className="resize-none"
                        aria-label='Hotel Description'
                        placeholder="Enter a description"
                        aria-invalid={!!errors.description?.message}
                      />
                    )}
                  />
                </FieldWithError>
              </div>
            </ModificationFormSection>

            <AccommodationLocation
              value={{ latitude, longitude }}
              onChange={({ latitude, longitude }) => {
                setValue('latitude', latitude);
                setValue('longitude', longitude);

                trigger('latitude');
                trigger('longitude');
              }}
            />

            <AccommodationRoom
              fields={roomFields}
              error={errors.rooms?.message}
              accommodationId={initialData?.id}
              onAppend={(val) => appendRoom(val)}
              onRemove={(idx) => removeRoom(idx)}
              onUpdate={(idx, val) => updateRoom(idx, val)}
            />
          </div>

          <div className="space-y-6">
            <AccommodationGallery
              accommodation={
                initialData
                  ? {
                      id: initialData.id,
                      title: initialData.title,
                    }
                  : undefined
              }
            />
            <AccommodationAmenity
              fields={amenityFields}
              error={errors.amenities?.message}
              onAppend={(val) => appendAmenity(val)}
              onRemove={(idx) => removeAmenity(idx)}
              onUpdate={(idx, val) => updateAmenity(idx, val)}
            />
            <AccommodationPolicy
              fields={policyFields}
              error={errors.policies?.message}
              onAppend={(val) => appendPolicy(val)}
              onRemove={(idx) => removePolicy(idx)}
              onUpdate={(idx, val) => updatePolicy(idx, val)}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
