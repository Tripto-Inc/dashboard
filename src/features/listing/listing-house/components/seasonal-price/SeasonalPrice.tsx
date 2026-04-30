import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { useGetCurrency } from '@/features/currency/hooks/useGetCurrency';
import { IconPlus } from '@tabler/icons-react';
import { FC, useState } from 'react';
import { SeasonalPriceProps, SelectedSeasonalPrice } from '../../types/seasonalPrice';
import { SeasonalPriceForm } from './SeasonalPriceForm';
import { SeasonalPriceItem } from './SeasonalPriceItem';

export const SeasonalPrice: FC<SeasonalPriceProps> = (props) => {
  const { fields, onAppend, onRemove, onUpdate, currencyId } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<SelectedSeasonalPrice>({
    seasonalPrice: null,
    index: undefined,
  });

  const { data: currency } = useGetCurrency(currencyId);

  return (
    <div className="space-y-6">
      {!isOpen ? (
        <ButtonPrimary
          size="sm"
          type="button"
          color="black"
          tone="outline"
          startIcon={<IconPlus />}
          onClick={() => setIsOpen(true)}
          className="h-10 w-full border-dashed border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-900"
        >
          Add Seasonal Price
        </ButtonPrimary>
      ) : (
        <SeasonalPriceForm
          fields={fields}
          currentItem={currentItem}
          createHnadler={onAppend}
          updateHnadler={onUpdate}
          closeHandler={() => {
            setIsOpen(false);
            setCurrentItem({ seasonalPrice: null, index: undefined });
          }}
          currencySymbol={currency?.symbol}
        />
      )}

      <div className="flex flex-wrap gap-3">
        {fields.length === 0 ? (
          <div className="w-full rounded-2xl border-2 border-dashed border-slate-100 py-8 text-center">
            <p className="text-sm text-slate-400">No seasonal price added yet</p>
          </div>
        ) : (
          fields.map((field, index) => (
            <SeasonalPriceItem
              key={index}
              item={field}
              onRemove={() => onRemove(index)}
              onEdit={() => {
                setIsOpen(true);
                setCurrentItem({ seasonalPrice: field, index });
              }}
              currencySymbol={currency?.symbol}
            />
          ))
        )}
      </div>
    </div>
  );
};
