'use client';

import { useGetCurrency } from '@/features/currency/hooks/useGetCurrency';
import { useGetDocuments } from '@/features/document/hooks/useGetDocuments';
import {
  IconBath,
  IconBed,
  IconHome,
  IconMeterSquare,
  IconPencil,
  IconRuler,
  IconTrash,
  IconUsers,
} from '@tabler/icons-react';
import { FC, useMemo } from 'react';
import { RoomItemProps } from '../../types/room';
import { SafeImage } from '@/components/shared/SafeImage';

export const AccommodationRoomItem: FC<RoomItemProps> = (props) => {
  const { item, accommodationId, onRemove, onEdit } = props;
  const { data: currency } = useGetCurrency(item.currencyId);
  const { data } = useGetDocuments({
    bucket: 'accommodations',
    id: item.id as string,
    category: 'roomGallery',
    prefix: `${accommodationId}/rooms/${item.id}/gallery`,
  });

  const previews = useMemo<string[]>(() => {
    if (data?.urls) return data.urls;
    else if (item.galleryImages?.length)
      return item.galleryImages.map((file) => URL.createObjectURL(file));
    else return [];
  }, [data?.urls, item.galleryImages]);

  const formatPrice = (amount: number, curr: string) => {
    try {
      if (amount === undefined || amount === null || isNaN(amount)) return '—';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: curr || 'USD',
        maximumFractionDigits: 2,
      }).format(amount);
    } catch (e) {
      return `${curr || ''} ${amount || 0}`;
    }
  };

  const price = item.price || 0;
  const discount = item.discount || 0;
  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
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
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-tl-lg rounded-tr-lg">
        <SafeImage
          fill
          alt={item.title}
          src={previews[0]}
          placeholderPatternSize={80}
          placeholderPatternOpacity={0.4}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {previews.length > 1 && (
          <div className="absolute right-2 bottom-2 rounded-md border border-white/20 bg-black/50 px-1.5 py-0.5 text-[8px] font-bold text-white uppercase backdrop-blur-md">
            +{previews.length - 1} photos
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-3 left-3 rounded-full border border-slate-200 bg-slate-200/40 px-2 py-1 text-[10px] font-bold text-slate-600 backdrop-blur-2xl">
            {discount}% Discount
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h4 className="truncate text-lg leading-tight font-bold text-slate-900 sm:text-xl">
          {item.title || 'Untitled AccommodationRoom Type'}
        </h4>

        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2">
          <div className="flex items-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50 px-2 py-1">
            <IconHome size={14} className="text-indigo-500" />
            <span className="text-[10px] leading-none font-bold text-indigo-700 sm:text-[11px]">
              {item.count} Units
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50 px-2 py-1">
            <IconUsers size={14} className="text-indigo-500" />
            <span className="text-[10px] leading-none font-bold text-indigo-700 sm:text-[11px]">
              {item.capacity} Guests
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50 px-2 py-1">
            <IconBath size={14} className="text-indigo-500" />
            <span className="text-[10px] leading-none font-bold text-indigo-700 sm:text-[11px]">
              {item.bathrooms} Bathrooms
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-indigo-100 bg-indigo-50 px-2 py-1">
            <IconRuler size={14} className="text-indigo-500" />
            <span className="flex items-center text-[10px] leading-none font-bold text-indigo-700 sm:text-[11px]">
              {item.area} <IconMeterSquare size={14} />
            </span>
          </div>

          {(() => {
            const labels = { king: 'King', queen: 'Queen', double: 'Double', single: 'Single' };
            const activeBeds = Object.entries(item.beds)
              .filter(([_, count]) => (count as number) > 0)
              .map(([name, count]) => `${count} ${labels[name as keyof typeof labels]}`);

            if (activeBeds.length === 0) return null;

            return (
              <div className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-2 py-1">
                <IconBed size={14} className="text-amber-500" />
                <span className="text-[10px] leading-none font-bold text-amber-700 sm:text-[11px]">
                  {activeBeds.join(' • ')}
                </span>
              </div>
            );
          })()}
        </div>

        <div className="mt-4 flex justify-end border-t border-slate-100 pt-3">
          <div className="text-right">
            {discount > 0 && currency && (
              <div className="text-[10px] font-bold text-slate-400 line-through">
                {formatPrice(price, currency?.isoCode)}
              </div>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-sm leading-none font-extrabold text-slate-900 sm:text-base">
                {currency && formatPrice(discountedPrice, currency?.isoCode)}
              </span>
              <span className="text-[10px] text-nowrap text-slate-600">/ night</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
