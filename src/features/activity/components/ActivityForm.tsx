'use client';

import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { DocumentUploader } from '@/components/shared/DocumentUploader';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { InfiniteDropdown } from '@/components/shared/InfiniteDropdown';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { Input } from '@/components/ui/input';
import { useGetActivityTypesDropdown } from '@/features/activity-type/hooks/useGetActivityTypesDropdown';
import { useGetCurrenciesDropdown } from '@/features/currency/hooks/useGetCurrenciesDropdown';
import { ImagePreviewWrapper } from '@/features/document';
import { DOCUMENT_QUERY_KEYS } from '@/features/document/constants';
import { queryClient } from '@/lib/query-client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IconDeviceFloppy,
  IconInfoCircle,
  IconMapPin,
  IconMoneybag,
  IconTicket,
} from '@tabler/icons-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCreateActivity } from '../hooks/useCreateActivity';
import { useUpdateActivity } from '../hooks/useUpdateActivity';
import { ActivitySchema, activitySchema } from '../schema';
import { ActivityFormProps } from '../types';

export const ActivityForm: FC<ActivityFormProps> = ({ initialData }) => {
  const router = useRouter();
  const isEditMode = Boolean(initialData?.id);
  const createActivityMutation = useCreateActivity();
  const updateActivityMutation = useUpdateActivity();

  const object = `${initialData?.id}/images/hero.webp`;
  const isSubmitting = updateActivityMutation.isPending || createActivityMutation.isPending;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivitySchema>({
    mode: 'onChange',
    resolver: zodResolver(activitySchema),
    defaultValues: {
      isActive: true,
      title: '',
      country: '',
      countryCode: '',
      city: '',
      addressDetails: '',
      currencyId: '',
      activityTypeId: '',
      price: undefined,
      discount: undefined,
      heroImage: undefined,
    },
  });

  const submitButtonLabel = useMemo(() => {
    if (isSubmitting) {
      return isEditMode ? 'Updating...' : 'Creating...';
    }

    return isEditMode ? 'Update Activity' : 'Create Activity';
  }, [isEditMode, isSubmitting]);

  const onSubmit = async (formData: ActivitySchema) => {
    const { heroImage, ...data } = formData;

    initialData?.id
      ? updateActivityMutation.mutateAsync({ id: initialData.id, data, heroImage }).then(() => {
          queryClient.invalidateQueries({
            queryKey: DOCUMENT_QUERY_KEYS.document({
              category: 'hero',
              id: initialData.id,
              bucket: 'activities',
            }),
          });
        })
      : createActivityMutation
          .mutateAsync({ data, heroImage })
          .then(() => router.push('/activities'));
  };

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        discount: initialData.discount || undefined,
      });
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {isEditMode ? `Edit ${initialData?.title}` : 'Create Activity'}
          </h1>
          <p className="mt-1 text-slate-500">
            {isEditMode
              ? 'Update activity details and availability.'
              : 'Create a new activity and configure its details.'}
          </p>
        </div>

        <ButtonPrimary
          size="lg"
          type="submit"
          disabled={isSubmitting}
          endIcon={<IconDeviceFloppy />}
        >
          {submitButtonLabel}
        </ButtonPrimary>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <ModificationFormSection
            icon={IconInfoCircle}
            title="General Information"
            headerExtraElements={
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-500">Is Active</span>
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <button
                      type="button"
                      onClick={() => field.onChange(!field.value)}
                      className={`relative h-6 w-12 rounded-full transition-colors ${field.value ? 'bg-blue-600' : 'bg-slate-200'}`}
                    >
                      <motion.div
                        animate={{ x: field.value ? 24 : 0 }}
                        className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm"
                      />
                    </button>
                  )}
                />
              </div>
            }
          >
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
              <FieldWithError required htmlFor="title" label="Title" error={errors.title?.message}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      id="title"
                      placeholder="Enter a title"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="activityType"
                label="Activity Type"
                error={errors.activityTypeId?.message}
              >
                <Controller
                  name="activityTypeId"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InfiniteDropdown
                      id="activityTypeId"
                      value={field.value}
                      onChange={field.onChange}
                      ariaInvalid={!!fieldState.error}
                      placeholder="Select an activity type"
                      useDataHook={useGetActivityTypesDropdown}
                    />
                  )}
                />
              </FieldWithError>
            </div>

            <FieldWithError
              htmlFor="heroImage"
              label="Hero Image"
              error={errors.heroImage?.message}
            >
              <Controller
                name="heroImage"
                control={control}
                render={({ field }) => (
                  <DocumentUploader ref={field.ref} value={field.value} onChange={field.onChange} />
                )}
              />
            </FieldWithError>

            {initialData?.id && (
              <ImagePreviewWrapper
                object={object}
                id={initialData.id}
                bucket="activities"
                title={initialData.title}
                className="h-110 w-full"
              />
            )}
          </ModificationFormSection>

          <ModificationFormSection icon={IconMapPin} title="Location Details">
            <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
              <FieldWithError
                required
                htmlFor="country"
                label="Country"
                error={errors.country?.message}
              >
                <Controller
                  name="country"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      id="country"
                      {...field}
                      placeholder="Enter a country"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="countryCode"
                label="Country Code"
                error={errors.countryCode?.message}
              >
                <Controller
                  name="countryCode"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      id="countryCode"
                      {...field}
                      placeholder="Enter a country code"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>

              <FieldWithError required htmlFor="city" label="City" error={errors.city?.message}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      id="city"
                      {...field}
                      placeholder="Enter a city"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="addressDetails"
                label="Address Details"
                error={errors.addressDetails?.message}
              >
                <Controller
                  name="addressDetails"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      id="addressDetails"
                      {...field}
                      placeholder="Enter an address details"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>
            </div>
          </ModificationFormSection>
        </div>

        <div className="space-y-6">
          <ModificationFormSection icon={IconMoneybag} title="Pricing">
            <FieldWithError required htmlFor="price" label="Price" error={errors.price?.message}>
              <Controller
                name="price"
                control={control}
                render={({ field, fieldState }) => (
                  <Input
                    id="price"
                    type="number"
                    step="0.1"
                    value={field.value ?? ''}
                    placeholder="Enter a price"
                    aria-invalid={!!fieldState.error}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.onChange(value === '' ? undefined : Number(value));
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
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
                  <Input
                    id="discount"
                    type="number"
                    step="0.1"
                    value={field.value ?? ''}
                    placeholder="Enter a discount"
                    aria-invalid={!!fieldState.error}
                    onChange={(event) => {
                      const value = event.target.value;
                      field.onChange(value === '' ? undefined : Number(value));
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
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
                    ariaInvalid={!!fieldState.error}
                    placeholder="Select a currency"
                    useDataHook={useGetCurrenciesDropdown}
                  />
                )}
              />
            </FieldWithError>
          </ModificationFormSection>

          <div className="relative overflow-hidden rounded-3xl bg-blue-600 p-6 text-white">
            <div className="relative z-10">
              <h3 className="mb-2 text-lg font-bold">Need Help?</h3>
              <p className="mb-4 text-sm text-blue-100">
                Check our documentation for advanced activity management.
              </p>
              <button
                type="button"
                className="w-full rounded-xl bg-white py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50"
              >
                View Guide
              </button>
            </div>

            <div className="absolute -right-4 -bottom-4 rotate-12 transform opacity-20">
              <IconTicket size={120} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
