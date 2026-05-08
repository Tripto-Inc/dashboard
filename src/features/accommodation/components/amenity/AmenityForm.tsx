import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { AmenitySchema, amenitySchema } from '../../schema/amenity';
import { AmenityFormProps } from '../../types/amenityForm';

export const AmenityForm: FC<AmenityFormProps> = (props) => {
  const { currentItem, closeHandler, createHnadler, updateHnadler } = props;
  const {
    reset,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<AmenitySchema>({
    mode: 'onChange',
    resolver: zodResolver(amenitySchema),
    defaultValues: {
      icon: '',
      title: '',
    },
  });

  const [title, icon] = useWatch({ control, name: ['title', 'icon'] });

  const onReset = () => reset({ icon: '', title: '' });

  const onClose = () => {
    onReset();
    closeHandler();
  };

  const onModify = () => {
    if (icon && title) {
      onClose();
      currentItem.index !== undefined
        ? updateHnadler(currentItem.index, { icon, title })
        : createHnadler({ icon, title });
    }
  };

  useEffect(() => {
    currentItem.amenity && reset(currentItem.amenity);
  }, [currentItem.amenity]);

  return (
    <div className="animate-in fade-in slide-in-from-top-2 relative grid grid-cols-1 gap-x-4 rounded-2xl border border-slate-200/60 bg-slate-50/50 p-5 shadow-inner duration-200 sm:grid-cols-2 lg:grid-cols-1">
      <FieldWithError required htmlFor="title" label="Title" error={errors.title?.message}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input
              id="title"
              {...field}
              className="bg-white"
              placeholder="Enter a title"
              aria-invalid={!!errors.title?.message}
            />
          )}
        />
      </FieldWithError>

      <FieldWithError required htmlFor="icon" label="Icon" error={errors.icon?.message}>
        <Controller
          name="icon"
          control={control}
          render={({ field }) => (
            <InputGroup className="bg-white">
              <InputGroupInput
                id="icon"
                {...field}
                placeholder="Enter a Tabler Icon name"
                aria-invalid={!!errors.icon?.message}
              />
              <InputGroupAddon align="inline-end">
                <DynamicIcon name={field.value} />
              </InputGroupAddon>
            </InputGroup>
          )}
        />
      </FieldWithError>

      <div className="flex items-center gap-2">
        <ButtonPrimary type="button" color="red" tone="outline" onClick={onClose}>
          Close
        </ButtonPrimary>
        <ButtonPrimary
          type="button"
          color="black"
          onClick={onModify}
          disabled={!isDirty || !isValid}
        >
          {currentItem.index !== undefined ? 'Update' : 'Add'}
        </ButtonPrimary>
      </div>
    </div>
  );
};
