import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { PolicySchema, policySchema } from '../../schema/policy';
import { PolicyFormProps } from '../../types/policyForm';

export const PolicyForm: FC<PolicyFormProps> = (props) => {
  const { currentItem, closeHandler, createHnadler, updateHnadler } = props;
  const {
    reset,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<PolicySchema>({
    mode: 'onChange',
    resolver: zodResolver(policySchema),
    defaultValues: {
      icon: '',
      title: '',
      description: '',
    },
  });

  const [title, icon, description] = useWatch({ control, name: ['title', 'icon', 'description'] });

  const onReset = () => reset({ icon: '', title: '', description: '' });

  const onClose = () => {
    onReset();
    closeHandler();
  };

  const onModify = () => {
    if (icon && title) {
      onClose();
      currentItem.index !== undefined
        ? updateHnadler(currentItem.index, { icon, title, description })
        : createHnadler({ icon, title, description });
    }
  };

  useEffect(() => {
    currentItem.policy && reset(currentItem.policy);
  }, [currentItem.policy]);

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
              <InputGroupAddon>
                <DynamicIcon name={field.value} className="text-slate-600" />
              </InputGroupAddon>
            </InputGroup>
          )}
        />
      </FieldWithError>

      <FieldWithError
        required
        label="Description"
        htmlFor="description"
        className="sm:col-span-2 lg:col-span-1"
        error={errors.description?.message}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              id="description"
              {...field}
              className="bg-white"
              placeholder="Enter a description"
              aria-invalid={!!errors.title?.message}
            />
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
