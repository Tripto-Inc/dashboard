'use client';

import { FieldWithError } from '@/components/shared/FieldWithError';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { ImagesPreviewWrapper } from '@/features/document/components/ImagesPreviewWrapper';
import { IconImageInPicture } from '@tabler/icons-react';
import { DocumentUploader } from '@/components/shared/DocumentUploader';
import { ImagePreviewWrapper } from '@/features/document';
import { AccommodationGalleryProps } from '@/features/accommodation/types/accommodationGallery';

export const AccommodationGallery: FC<AccommodationGalleryProps> = ({ accommodation }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const heroImageObject = `${accommodation?.id}/hero.webp`;
  const galleryImagesPrefix = `${accommodation?.id}/gallery`;

  return (
    <ModificationFormSection icon={IconImageInPicture} title="Gallery">
      <div className="flex flex-col">
        <FieldWithError
          label="Hero Image"
          htmlFor="heroImage"
          error={errors.heroImage?.message as string}
        >
          <Controller
            name="heroImage"
            control={control}
            render={({ field }) => (
              <DocumentUploader ref={field.ref} value={field.value} onChange={field.onChange} />
            )}
          />
        </FieldWithError>
        {accommodation && (
          <ImagePreviewWrapper
            id={accommodation.id}
            bucket="accommodations"
            object={heroImageObject}
            title={accommodation.title}
          />
        )}

        <FieldWithError
          label="Gallery Images"
          htmlFor="galleryImages"
          error={errors.galleryImages?.message as string}
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
        {accommodation && (
          <ImagesPreviewWrapper
            className="size-20"
            id={accommodation.id}
            bucket="accommodations"
            title={accommodation.title}
            prefix={galleryImagesPrefix}
          />
        )}
      </div>
    </ModificationFormSection>
  );
};
