'use client';

import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconCurrencyDollar, IconDeviceFloppy, IconInfoCircle } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCreateCurrency } from '../hooks/useCreateCurrency';
import { useUpdateCurrency } from '../hooks/useUpdateCurrency';
import { CurrencySchema, currencySchema } from '../schema';
import { CurrencyFormProps } from '../types';

export const CurrencyForm: FC<CurrencyFormProps> = ({ initialData }) => {
  const router = useRouter();
  const isEditMode = Boolean(initialData?.id);
  const createCurrencyMutation = useCreateCurrency();
  const updateCurrencyMutation = useUpdateCurrency();
  const isSubmitting = updateCurrencyMutation.isPending || createCurrencyMutation.isPending;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CurrencySchema>({
    mode: 'onChange',
    resolver: zodResolver(currencySchema),
    defaultValues: {
      title: '',
      symbol: '',
      isoCode: '',
      isActive: true,
    },
  });

  const submitButtonLabel = useMemo(() => {
    if (isSubmitting) {
      return isEditMode ? 'Updating...' : 'Creating...';
    }

    return isEditMode ? 'Update Currency' : 'Create Currency';
  }, [isEditMode, isSubmitting]);

  const onSubmit = async (formData: CurrencySchema) => {
    initialData?.id
      ? updateCurrencyMutation.mutateAsync({ id: initialData.id, data: formData })
      : createCurrencyMutation.mutateAsync(formData).then(() => router.push('/currencies'));
  };

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {isEditMode ? `Edit ${initialData?.title}` : 'Create Currency'}
          </h1>
          <p className="mt-1 text-slate-500">
            {isEditMode
              ? 'Update currency details and availability.'
              : 'Create a new currency and configure its details.'}
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
                htmlFor="isoCode"
                label="ISO Code"
                error={errors.isoCode?.message}
              >
                <Controller
                  name="isoCode"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      id="isoCode"
                      {...field}
                      placeholder="Enter a isoCode"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="symbol"
                label="Symbol"
                error={errors.symbol?.message}
              >
                <Controller
                  name="symbol"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      id="symbol"
                      {...field}
                      placeholder="Enter a symbol"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>
            </div>
          </ModificationFormSection>
        </div>

        <div>
          <div className="relative overflow-hidden rounded-3xl bg-blue-600 p-6 text-white">
            <div className="relative z-10 flex h-full flex-col">
              <h3 className="mb-2 text-lg font-bold">Need Help?</h3>
              <p className="mb-4 text-sm text-blue-100">
                Check our documentation for advanced currency management.
              </p>
              <button
                type="button"
                className="mt-auto w-full rounded-xl bg-white py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50"
              >
                View Guide
              </button>
            </div>

            <div className="absolute -right-4 -bottom-4 rotate-12 transform opacity-20">
              <IconCurrencyDollar size={120} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
