'use client';

import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconDeviceFloppy, IconInfoCircle, IconTag } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { useCreateAccommodationTag } from '../hooks/useCreateAccommodationTag';
import { useUpdateAccommodationTag } from '../hooks/useUpdateAccommodationTag';
import { AccommodationTagSchema, accommodationTagSchema } from '../schema';
import { AccommodationTagFormProps } from '@/features/accommodation-tag/types';
import { type FC, useEffect, useMemo } from 'react';
import { ColorPicker } from '@/components/ui/color-picker';

export const AccommodationTagForm: FC<AccommodationTagFormProps> = ({ initialData }) => {
  const router = useRouter();
  const isEditMode = Boolean(initialData?.id);
  const createAccommodationTagMutation = useCreateAccommodationTag();
  const updateAccommodationTagMutation = useUpdateAccommodationTag();
  const isSubmitting =
    updateAccommodationTagMutation.isPending || createAccommodationTagMutation.isPending;

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccommodationTagSchema>({
    mode: 'onChange',
    resolver: zodResolver(accommodationTagSchema),
    defaultValues: {
      emoji: '',
      title: '',
      isActive: true,
      textColor: '',
      borderColor: '',
      backgroundColor: '',
    },
  });

  const submitButtonLabel = useMemo(() => {
    if (isSubmitting) {
      return isEditMode ? 'Updating...' : 'Creating...';
    }

    return isEditMode ? 'Update Accommodation Tag' : 'Create Accommodation Tag';
  }, [isEditMode, isSubmitting]);

  const onSubmit = async (formData: AccommodationTagSchema) => {
    if (initialData?.id) {
      await updateAccommodationTagMutation.mutateAsync({ id: initialData.id, data: formData });
    } else {
      await createAccommodationTagMutation.mutateAsync(formData);
      router.push('/accommodation-tags');
    }
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
            {isEditMode ? `Edit ${initialData?.title}` : 'Create Accommodation Tag'}
          </h1>
          <p className="mt-1 text-slate-500">
            {isEditMode
              ? 'Update accommodation tag details and availability.'
              : 'Create a new accommodation tag and configure its details.'}
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
            <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-6">
              <FieldWithError
                required
                htmlFor="title"
                label="Title"
                className="lg:col-span-3"
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
                htmlFor="emoji"
                label="Emoji"
                className="lg:col-span-3"
                error={errors.emoji?.message}
              >
                <Controller
                  name="emoji"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      id="emoji"
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      placeholder="Enter an emoji"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>

              <FieldWithError
                required
                htmlFor="textColor"
                label="Text Color"
                error={errors.textColor?.message}
                className="lg:col-span-2"
              >
                <Controller
                  name="textColor"
                  control={control}
                  render={({ field, fieldState }) => (
                    <ColorPicker
                      color={field.value}
                      onChange={field.onChange}
                      placeholder="Pick a text color"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>
              <FieldWithError
                required
                htmlFor="borderColor"
                label="Border Color"
                error={errors.borderColor?.message}
                className="lg:col-span-2"
              >
                <Controller
                  name="borderColor"
                  control={control}
                  render={({ field, fieldState }) => (
                    <ColorPicker
                      color={field.value}
                      onChange={field.onChange}
                      placeholder="Pick a border color"
                      aria-invalid={!!fieldState.error}
                    />
                  )}
                />
              </FieldWithError>
              <FieldWithError
                required
                htmlFor="backgroundColor"
                label="Background Color"
                error={errors.backgroundColor?.message}
                className="lg:col-span-2"
              >
                <Controller
                  name="backgroundColor"
                  control={control}
                  render={({ field, fieldState }) => (
                    <ColorPicker
                      color={field.value}
                      onChange={field.onChange}
                      placeholder="Pick a background color"
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
                Check our documentation for advanced accommodation tag management.
              </p>
              <button
                type="button"
                className="mt-auto w-full rounded-xl bg-white py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50"
              >
                View Guide
              </button>
            </div>

            <div className="absolute -right-4 -bottom-4 rotate-12 transform opacity-20">
              <IconTag size={120} />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
