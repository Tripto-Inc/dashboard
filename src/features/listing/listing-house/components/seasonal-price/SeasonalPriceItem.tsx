import { IconCalendar, IconPencil, IconTrash } from '@tabler/icons-react';
import { format } from 'date-fns';
import { FC } from 'react';
import { SeasonalPriceItemProps } from '../../types/seasonalPrice';

export const SeasonalPriceItem: FC<SeasonalPriceItemProps> = (props) => {
  const { item, onRemove, onEdit, currencySymbol } = props;

  return (
    <div className="group relative flex h-12.5 items-center gap-3 rounded-md border border-dashed border-slate-500 bg-white px-3">
      <div className="flex items-center gap-2 text-slate-800">
        <IconCalendar size={20} strokeWidth={1.6} />

        <div className="flex flex-col">
          <span className="text-xs font-semibold">
            {format(new Date(item.date), 'MMM dd, yyyy')}
          </span>
          <p className="space-x-0.5 text-xs font-medium text-slate-500">
            <span>{item.price}</span>
            <span className="text-[10px]">{currencySymbol}</span>
          </p>
        </div>
      </div>

      <div className="absolute -top-3 right-2 flex scale-0 items-center bg-white blur-md transition-all duration-500 group-hover:scale-100 group-hover:blur-none">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          title="Edit"
        >
          <IconPencil size={14} />
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full p-1 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
          title="Delete"
        >
          <IconTrash size={14} />
        </button>
      </div>
    </div>
  );
};
