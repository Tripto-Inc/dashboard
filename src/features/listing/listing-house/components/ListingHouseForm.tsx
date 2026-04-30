'use client';

import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { DocumentUploader } from '@/components/shared/DocumentUploader';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { InfiniteDropdown } from '@/components/shared/InfiniteDropdown';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Textarea } from '@/components/ui/textarea';
import { useGetCurrenciesDropdown } from '@/features/currency/hooks/useGetCurrenciesDropdown';
import { ImagePreviewWrapper } from '@/features/document';
import { ImagesPreviewWrapper } from '@/features/document/components/ImagesPreviewWrapper';
import { DOCUMENT_QUERY_KEYS } from '@/features/document/constants';
import { Amenity, Policy } from '@/features/listing';
import { queryClient } from '@/lib/query-client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IconBath,
  IconBed,
  IconCalendar,
  IconDeviceFloppy,
  IconHome,
  IconImageInPicture,
  IconInfoCircle,
  IconMapPin,
  IconMoneybag,
  IconRuler,
  IconShieldCheck,
  IconSparkles,
  IconStackBack,
  IconUsers,
} from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useMemo } from 'react';
import { Controller, FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { ListingLocationSkeleton } from '../../components/location/ListingLocationSkeleton';
import { useCreateListingHouse } from '../hooks/useCreateListingHouse';
import { useUpdateListingHouse } from '../hooks/useUpdateListingHouse';
import { ListingHouseSchema, listingHouseSchema } from '../schema/listingHouse';
import { ListingHouseFormProps } from '../types/listingHouseForm';
import { SeasonalPrice } from './seasonal-price/SeasonalPrice';

const ListingLocation = dynamic(
  () =>
    import('../../components/location/ListingLocation').then((module) => module.ListingLocation),
  {
    ssr: false,
    loading: () => <ListingLocationSkeleton />,
  },
);

export const ListingHouseForm: FC<ListingHouseFormProps> = ({ initialData }) => {
  const router = useRouter();
  const isEditMode = Boolean(initialData?.id);
  const createListingHouseMutation = useCreateListingHouse();
  const updateListingHouseMutation = useUpdateListingHouse();

  const heroImageObject = `${initialData?.id}/images/hero.webp`;
  const galleryImagesPrefix = `${initialData?.id}/images/gallery`;
  const isSubmitting = updateListingHouseMutation.isPending || createListingHouseMutation.isPending;

  const form = useForm<ListingHouseSchema>({
    mode: 'onChange',
    resolver: zodResolver(listingHouseSchema),
    defaultValues: {
      title: '',
      description: '',
      capacity: undefined,
      currencyId: '',
      country: '',
      countryCode: '',
      city: '',
      addressDetails: '',
      latitude: undefined,
      longitude: undefined,
      heroImage: undefined,
      galleryImages: [],

      availableDates: [],
      amenities: [],
      policies: [],
    },
  });

  const {
    reset,
    trigger,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        ...initialData.house,
        ...initialData.address,
        addressDetails: initialData.address.details,
        discount: initialData.house?.discount || undefined,
        policies: JSON.parse(JSON.stringify(initialData.policies)),
        amenities: JSON.parse(JSON.stringify(initialData.amenities)),
        availableDates: JSON.parse(JSON.stringify(initialData.house?.availableDates)),
      });
    }
  }, [initialData, reset]);

  const submitButtonLabel = useMemo(() => {
    if (isSubmitting) {
      return isEditMode ? 'Updating...' : 'Creating...';
    }

    return isEditMode ? 'Update House' : 'Create House';
  }, [isEditMode, isSubmitting]);

  const [latitude, longitude, currencyId] = useWatch({
    control,
    name: ['latitude', 'longitude', 'currencyId'],
  });

  const {
    fields: dateFields,
    append: appendDate,
    remove: removeDate,
    update: updateDate,
  } = useFieldArray({
    control: control,
    name: 'availableDates',
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

  const onSubmit = async (formData: ListingHouseSchema) => {
    const { heroImage, galleryImages, ...data } = formData;

    initialData?.id
      ? updateListingHouseMutation
          .mutateAsync({
            id: initialData.id,
            data: {
              ...data,
              latitude: data.latitude as number,
              longitude: data.longitude as number,
            },
            heroImage,
            galleryImages,
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
          })
      : createListingHouseMutation
          .mutateAsync({
            data: {
              ...data,
              latitude: data.latitude as number,
              longitude: data.longitude as number,
            },
            heroImage,
            galleryImages,
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
              <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-3">
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
                      <InputGroup>
                        <InputGroupInput
                          id="title"
                          {...field}
                          placeholder="Enter a title"
                          aria-invalid={!!errors.title?.message}
                        />
                        <InputGroupAddon align="inline-end">
                          <IconHome className="size-5" />
                        </InputGroupAddon>
                      </InputGroup>
                    )}
                  />
                </FieldWithError>

                <FieldWithError
                  required
                  htmlFor="capacity"
                  label="Capacity"
                  error={errors.capacity?.message}
                >
                  <Controller
                    name="capacity"
                    control={control}
                    render={({ field }) => (
                      <InputGroup>
                        <InputGroupInput
                          id="capacity"
                          type="number"
                          value={field.value ?? ''}
                          placeholder="Enter a capacity"
                          onChange={(event) => {
                            const value = event.target.value;
                            field.onChange(value === '' ? undefined : Number(value));
                          }}
                          aria-invalid={!!errors.capacity?.message}
                        />
                        <InputGroupAddon align="inline-end">
                          <IconUsers className="size-5" />
                        </InputGroupAddon>
                      </InputGroup>
                    )}
                  />
                </FieldWithError>

                <FieldWithError required htmlFor="area" label="Area" error={errors.area?.message}>
                  <Controller
                    name="area"
                    control={control}
                    render={({ field }) => (
                      <InputGroup>
                        <InputGroupInput
                          id="area"
                          type="number"
                          value={field.value ?? ''}
                          placeholder="Enter an area"
                          onChange={(event) => {
                            const value = event.target.value;
                            field.onChange(value === '' ? undefined : Number(value));
                          }}
                          aria-invalid={!!errors.area?.message}
                        />
                        <InputGroupAddon align="inline-end">
                          <IconRuler className="size-5" />
                        </InputGroupAddon>
                      </InputGroup>
                    )}
                  />
                </FieldWithError>

                <FieldWithError
                  required
                  htmlFor="floors"
                  label="Floors"
                  error={errors.floors?.message}
                >
                  <Controller
                    name="floors"
                    control={control}
                    render={({ field }) => (
                      <InputGroup>
                        <InputGroupInput
                          id="floors"
                          type="number"
                          value={field.value ?? ''}
                          placeholder="Enter floors count"
                          onChange={(event) => {
                            const value = event.target.value;
                            field.onChange(value === '' ? undefined : Number(value));
                          }}
                          aria-invalid={!!errors.floors?.message}
                        />
                        <InputGroupAddon align="inline-end">
                          <IconStackBack className="size-5" />
                        </InputGroupAddon>
                      </InputGroup>
                    )}
                  />
                </FieldWithError>

                <FieldWithError
                  required
                  htmlFor="bedrooms"
                  label="Bedrooms"
                  error={errors.bedrooms?.message}
                >
                  <Controller
                    name="bedrooms"
                    control={control}
                    render={({ field }) => (
                      <InputGroup>
                        <InputGroupInput
                          id="bedrooms"
                          type="number"
                          value={field.value ?? ''}
                          placeholder="Enter bedrooms count"
                          onChange={(event) => {
                            const value = event.target.value;
                            field.onChange(value === '' ? undefined : Number(value));
                          }}
                          aria-invalid={!!errors.bedrooms?.message}
                        />
                        <InputGroupAddon align="inline-end">
                          <IconBed className="size-5" />
                        </InputGroupAddon>
                      </InputGroup>
                    )}
                  />
                </FieldWithError>

                <FieldWithError
                  required
                  htmlFor="bathrooms"
                  label="Bathrooms"
                  error={errors.bathrooms?.message}
                >
                  <Controller
                    name="bathrooms"
                    control={control}
                    render={({ field }) => (
                      <InputGroup>
                        <InputGroupInput
                          id="bathrooms"
                          type="number"
                          value={field.value ?? ''}
                          placeholder="Enter bathrooms count"
                          onChange={(event) => {
                            const value = event.target.value;
                            field.onChange(value === '' ? undefined : Number(value));
                          }}
                          aria-invalid={!!errors.bathrooms?.message}
                        />
                        <InputGroupAddon align="inline-end">
                          <IconBath className="size-5" />
                        </InputGroupAddon>
                      </InputGroup>
                    )}
                  />
                </FieldWithError>

                <FieldWithError
                  required
                  label="Description"
                  htmlFor="description"
                  className="lg:col-span-3"
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

            <ModificationFormSection icon={IconMoneybag} title="Pricing">
              <div className="grid grid-cols-1 gap-x-6 md:grid-cols-3">
                <FieldWithError
                  required
                  htmlFor="price"
                  label="Price"
                  error={errors.price?.message}
                >
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="price"
                        type="number"
                        step="0.1"
                        value={field.value ?? ''}
                        placeholder="Enter a price"
                        onChange={(event) => {
                          const value = event.target.value;
                          field.onChange(value === '' ? undefined : Number(value));
                        }}
                        aria-invalid={!!errors.price?.message}
                      />
                    )}
                  />
                </FieldWithError>

                <FieldWithError
                  required
                  htmlFor="currency"
                  label="Currency"
                  error={errors.currencyId?.message}
                >
                  <Controller
                    name="currencyId"
                    control={control}
                    render={({ field, fieldState }) => (
                      <InfiniteDropdown
                        id="currencyId"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select a currency"
                        ariaInvalid={!!fieldState.error}
                        useDataHook={useGetCurrenciesDropdown}
                      />
                    )}
                  />
                </FieldWithError>

                <FieldWithError
                  htmlFor="discount"
                  label="Discount (%)"
                  error={errors.discount?.message}
                >
                  <Controller
                    name="discount"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="discount"
                        type="number"
                        step="0.1"
                        value={field.value ?? ''}
                        placeholder="Enter a discount"
                        onChange={(event) => {
                          const value = event.target.value;
                          field.onChange(value === '' ? undefined : Number(value));
                        }}
                        aria-invalid={!!errors.discount?.message}
                      />
                    )}
                  />
                </FieldWithError>
              </div>
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

            <ModificationFormSection icon={IconCalendar} title="Available Dates & Seasonal Pricing">
              <SeasonalPrice
                fields={dateFields}
                onAppend={(val) => appendDate(val)}
                onRemove={(idx) => removeDate(idx)}
                onUpdate={(idx, val) => updateDate(idx, val)}
                currencyId={currencyId}
              />
            </ModificationFormSection>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
