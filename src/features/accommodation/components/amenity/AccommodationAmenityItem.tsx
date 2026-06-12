import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { FC } from 'react';
import { AccommodationAmenityItemProps } from '@/features/accommodation/types/accommodationAmenity';

export const AccommodationAmenityItem: FC<AccommodationAmenityItemProps> = (props) => {
  const { item, onRemove, onEdit } = props;

  return (
    <div className="group relative flex items-center gap-3 rounded-full border border-dashed border-slate-500 bg-white px-3 py-2">
      <div className="flex items-center gap-2 text-slate-800">
        <DynamicIcon name={item.icon} strokeWidth={1.6} size={20} />
        <span className="text-sm">{item.title}</span>
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
