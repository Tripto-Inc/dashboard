import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { FC, useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { seasonalPriceSchema, SeasonalPriceSchema } from '../../schema/seasonalPrice';
import { SeasonalPriceFormProps } from '../../types/seasonalPrice';

export const SeasonalPriceForm: FC<SeasonalPriceFormProps> = (props) => {
  const { fields, currentItem, currencySymbol, closeHandler, createHnadler, updateHnadler } = props;
  const {
    reset,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm<SeasonalPriceSchema>({
    mode: 'onChange',
    resolver: zodResolver(seasonalPriceSchema),
    defaultValues: {
      date: new Date().toISOString(),
      price: undefined,
    },
  });

  const [date, price] = useWatch({ control, name: ['date', 'price'] });

  const onReset = () => reset({ date: new Date().toISOString(), price: undefined });

  const onClose = () => {
    onReset();
    closeHandler();
  };

  const onModify = () => {
    const dateExists = fields.some(
      (field) => new Date(field.date).getDate() === new Date(date).getDate(),
    );

    if (currentItem.index === undefined && dateExists) {
      toast.error('A price is already defined for this date');
    } else if (date && price) {
      onClose();
      currentItem.index !== undefined
        ? updateHnadler(currentItem.index, { date, price })
        : createHnadler({ date, price });
    }
  };

  useEffect(() => {
    currentItem.seasonalPrice && reset(currentItem.seasonalPrice);
  }, [currentItem.seasonalPrice]);

  return (
    <div className="animate-in fade-in slide-in-from-top-2 relative grid grid-cols-1 gap-x-4 rounded-2xl border border-slate-200/60 bg-slate-50/50 p-5 shadow-inner duration-200 sm:grid-cols-2 lg:grid-cols-1">
      <FieldWithError required htmlFor="date" label="Date" error={errors.date?.message}>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className="h-11.5 w-full justify-start rounded-lg border-slate-200 pl-2 font-normal shadow-none hover:bg-white"
                >
                  {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={new Date(field.value)}
                  onSelect={(date) => field.onChange(date?.toISOString())}
                />
              </PopoverContent>
            </Popover>
          )}
        />
      </FieldWithError>

      <FieldWithError required htmlFor="price" label="Price" error={errors.price?.message}>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <InputGroup className="bg-white">
              <InputGroupInput
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
              <InputGroupAddon align="inline-end">{currencySymbol}</InputGroupAddon>
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
