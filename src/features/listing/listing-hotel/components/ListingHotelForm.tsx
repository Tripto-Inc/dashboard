'use client';

import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { DocumentUploader } from '@/components/shared/DocumentUploader';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImagePreviewWrapper } from '@/features/document';
import { ImagesPreviewWrapper } from '@/features/document/components/ImagesPreviewWrapper';
import { DOCUMENT_QUERY_KEYS } from '@/features/document/constants';
import { queryClient } from '@/lib/query-client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IconBed,
  IconDeviceFloppy,
  IconImageInPicture,
  IconInfoCircle,
  IconMapPin,
  IconShieldCheck,
  IconSparkles,
} from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useMemo } from 'react';
import { Controller, FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { Amenity } from '../../components/amenity/Amenity';
import { ListingLocationSkeleton } from '../../components/location/ListingLocationSkeleton';
import { Policy } from '../../components/policy/Policy';
import { useCreateListingHotel } from '../hooks/useCreateListingHotel';
import { useUpdateListingHotel } from '../hooks/useUpdateListingHotel';
import { listingHotelSchema, ListingHotelSchema } from '../schema/listingHotel';
import { ListingHotelFormProps } from '../types/listingHotelForm';
import { Room } from './room/Room';

const ListingLocation = dynamic(
  () =>
    import('../../components/location/ListingLocation').then((module) => module.ListingLocation),
  {
    ssr: false,
    loading: () => <ListingLocationSkeleton />,
  },
);

export const ListingHotelForm: FC<ListingHotelFormProps> = ({ initialData }) => {
  const router = useRouter();
  const isEditMode = Boolean(initialData?.id);
  const createListingHotelMutation = useCreateListingHotel();
  const updateListingHotelMutation = useUpdateListingHotel();

  const heroImageObject = `${initialData?.id}/hero.webp`;
  const galleryImagesPrefix = `${initialData?.id}/gallery`;
  const isSubmitting = updateListingHotelMutation.isPending || createListingHotelMutation.isPending;

  const form = useForm<ListingHotelSchema>({
    mode: 'onChange',
    resolver: zodResolver(listingHotelSchema),
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

  const onSubmit = async (formData: ListingHotelSchema) => {
    const { heroImage, galleryImages, ...data } = formData;
    const rooms = data.rooms.map(({ galleryImages, ...otherData }) => otherData);
    const roomsGalleryImages = data.rooms.map(
      ({ galleryImages }) => galleryImages?.filter((image) => image != null) || [],
    );

    initialData?.id
      ? updateListingHotelMutation
          .mutateAsync({
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
          })
          .then(() => {
            queryClient.invalidateQueries({
              queryKey: DOCUMENT_QUERY_KEYS.document({
                id: initialData.id,
                bucket: 'listings',
                category: 'hero',
              }),
            });
            queryClient.invalidateQueries({
              queryKey: DOCUMENT_QUERY_KEYS.document({
                id: initialData.id,
                bucket: 'listings',
                category: 'gallery',
              }),
            });
            queryClient.invalidateQueries({
              queryKey: DOCUMENT_QUERY_KEYS.document({
                bucket: 'listings',
                category: 'roomGallery',
              }),
            });
          })
      : createListingHotelMutation
          .mutateAsync({
            data: {
              ...data,
              rooms,
              latitude: data.latitude as number,
              longitude: data.longitude as number,
            },
            heroImage,
            galleryImages,
            roomsGalleryImages,
          })
          .then(() => router.push('/listings'));
  };

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
                        placeholder="Enter a description"
                        aria-invalid={!!errors.description?.message}
                      />
                    )}
                  />
                </FieldWithError>
              </div>
            </ModificationFormSection>

            <ModificationFormSection icon={IconMapPin} title="Address">
              <ListingLocation
                value={{ latitude, longitude }}
                onChange={({ latitude, longitude }) => {
                  setValue('latitude', latitude);
                  setValue('longitude', longitude);

                  trigger('latitude');
                  trigger('longitude');
                }}
              />
            </ModificationFormSection>

            <ModificationFormSection icon={IconBed} title="Available Rooms">
              <Room
                fields={roomFields}
                listingId={initialData?.id}
                error={errors.rooms?.message}
                onAppend={(val) => appendRoom(val)}
                onRemove={(idx) => removeRoom(idx)}
                onUpdate={(idx, val) => updateRoom(idx, val)}
              />
            </ModificationFormSection>
          </div>

          <div className="space-y-6">
            <ModificationFormSection icon={IconImageInPicture} title="Gallery">
              <div className="flex flex-col">
                <FieldWithError
                  label="Hero Image"
                  htmlFor="heroImage"
                  error={errors.heroImage?.message}
                >
                  <Controller
                    name="heroImage"
                    control={control}
                    render={({ field }) => (
                      <DocumentUploader
                        ref={field.ref}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </FieldWithError>
                {initialData?.id && (
                  <ImagePreviewWrapper
                    bucket="listings"
                    id={initialData.id}
                    object={heroImageObject}
                    title={initialData.title}
                  />
                )}

                <FieldWithError
                  label="Gallery Images"
                  htmlFor="galleryImages"
                  error={errors.galleryImages?.message}
                >
                  <Controller
                    name="galleryImages"
                    control={control}
                    render={({ field }) => (
                      <DocumentUploader
                        multiple
                        ref={field.ref}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </FieldWithError>
                {initialData?.id && (
                  <ImagesPreviewWrapper
                    bucket="listings"
                    id={initialData.id}
                    title={initialData.title}
                    prefix={galleryImagesPrefix}
                    className="size-20"
                  />
                )}
              </div>
            </ModificationFormSection>

            <ModificationFormSection icon={IconSparkles} title="Amenities">
              <Amenity
                fields={amenityFields}
                error={errors.amenities?.message}
                onAppend={(val) => appendAmenity(val)}
                onRemove={(idx) => removeAmenity(idx)}
                onUpdate={(idx, val) => updateAmenity(idx, val)}
              />
            </ModificationFormSection>

            <ModificationFormSection icon={IconShieldCheck} title="Policies">
              <Policy
                fields={policyFields}
                addButtonTitle="Add Policy"
                error={errors.policies?.message}
                onAppend={(val) => appendPolicy(val)}
                onRemove={(idx) => removePolicy(idx)}
                onUpdate={(idx, val) => updatePolicy(idx, val)}
                emptyFieldsMessage="No policy added yet"
              />
            </ModificationFormSection>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
