'use client';

import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { InfiniteDropdown } from '@/components/shared/InfiniteDropdown';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AccommodationAmenity, AccommodationPolicy } from '@/features/accommodation';
import { useGetCurrenciesDropdown } from '@/features/currency/hooks/useGetCurrenciesDropdown';
import { DOCUMENT_QUERY_KEYS } from '@/features/document/constants';
import { queryClient } from '@/lib/query-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconDeviceFloppy, IconInfoCircle, IconMoneybag } from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useMemo } from 'react';
import { Controller, FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { AccommodationLocationSkeleton } from '../../components/location/AccommodationLocationSkeleton';
import { useCreateHouse } from '../hooks/useCreateHouse';
import { useUpdateHouse } from '../hooks/useUpdateHouse';
import { HouseSchema, houseSchema } from '../schema/house';
import { HouseFormProps } from '../types/houseForm';
import { SeasonalPrice } from './seasonal-price/SeasonalPrice';
import { NumberInput } from '@/components/shared/Input/NumberInput';
import { AccommodationGallery } from '@/features/accommodation/components/gallery/AccommodationGallery';
import { useGetAccommodationTagsDropdown } from '@/features/accommodation-tag/hooks/useGetAccommodationTagsDropdown';

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

export const HouseForm: FC<HouseFormProps> = ({ initialData }) => {
  const router = useRouter();
  const isEditMode = Boolean(initialData?.id);
  const createHouseMutation = useCreateHouse();
  const updateHouseMutation = useUpdateHouse();

  const isSubmitting = updateHouseMutation.isPending || createHouseMutation.isPending;

  const form = useForm<HouseSchema>({
    mode: 'onChange',
    resolver: zodResolver(houseSchema),
    defaultValues: {
      title: '',
      description: '',
      capacity: undefined,
      currencyId: '',
      accommodationTagId: '',
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

  const onSubmit = async (formData: HouseSchema) => {
    const { heroImage, galleryImages, ...data } = formData;

    if (initialData?.id) {
      await updateHouseMutation.mutateAsync({
        id: initialData.id,
        data: {
          ...data,
          latitude: data.latitude as number,
          longitude: data.longitude as number,
        },
        heroImage,
        galleryImages,
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
    } else {
      await createHouseMutation.mutateAsync({
        data: {
          ...data,
          latitude: data.latitude as number,
          longitude: data.longitude as number,
        },
        heroImage,
        galleryImages,
      });

      router.push('/accommodations');
    }
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
                    render={({ field, fieldState }) => (
                      <Input
                        id="title"
                        {...field}
                        placeholder="Enter a title"
                        aria-invalid={!!fieldState.error}
                      />
                    )}
                  />
                </FieldWithError>

                <FieldWithError
                  required
                  htmlFor="tag"
                  label="Tag"
                  error={errors.accommodationTagId?.message}
                >
                  <Controller
                    name="accommodationTagId"
                    control={control}
                    render={({ field, fieldState }) => (
                      <InfiniteDropdown
                        id="accommodationTagId"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select a tag"
                        ariaInvalid={!!fieldState.error}
                        useDataHook={useGetAccommodationTagsDropdown}
                      />
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
                    render={({ field, fieldState }) => (
                      <NumberInput
                        {...field}
                        id="capacity"
                        placeholder="Enter a capacity"
                        ariaInvalid={!!fieldState.error}
                      />
                    )}
                  />
                </FieldWithError>

                <FieldWithError required htmlFor="area" label="Area" error={errors.area?.message}>
                  <Controller
                    name="area"
                    control={control}
                    render={({ field, fieldState }) => (
                      <NumberInput
                        {...field}
                        id="area"
                        placeholder="Enter an area"
                        ariaInvalid={!!fieldState.error}
                      />
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
                    render={({ field, fieldState }) => (
                      <NumberInput
                        {...field}
                        id="floors"
                        placeholder="Enter floors count"
                        ariaInvalid={!!fieldState.error}
                      />
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
                    render={({ field, fieldState }) => (
                      <NumberInput
                        {...field}
                        id="bedrooms"
                        placeholder="Enter bedrooms count"
                        ariaInvalid={!!fieldState.error}
                      />
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
                    render={({ field, fieldState }) => (
                      <NumberInput
                        {...field}
                        id="bathrooms"
                        placeholder="Enter bathrooms count"
                        ariaInvalid={!!fieldState.error}
                      />
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

            <AccommodationLocation
              value={{ latitude, longitude }}
              onChange={({ latitude, longitude }) => {
                setValue('latitude', latitude);
                setValue('longitude', longitude);

                trigger('latitude');
                trigger('longitude');
              }}
            />

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
                    render={({ field, fieldState }) => (
                      <NumberInput
                        {...field}
                        id="price"
                        step={0.1}
                        placeholder="Enter a price"
                        ariaInvalid={!!fieldState.error}
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
                    render={({ field, fieldState }) => (
                      <NumberInput
                        {...field}
                        id="price"
                        step={0.1}
                        placeholder="Enter a price"
                        ariaInvalid={!!fieldState.error}
                      />
                    )}
                  />
                </FieldWithError>
              </div>
            </ModificationFormSection>
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
            <SeasonalPrice
              fields={dateFields}
              onAppend={(val) => appendDate(val)}
              onRemove={(idx) => removeDate(idx)}
              onUpdate={(idx, val) => updateDate(idx, val)}
              currencyId={currencyId}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
