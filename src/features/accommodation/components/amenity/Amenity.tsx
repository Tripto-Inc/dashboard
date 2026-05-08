'use client';

import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { IconPlus } from '@tabler/icons-react';
import { FC, useState } from 'react';
import type { AmenityProps, SelectedAmenity } from '../../types/amenityForm';
import { AmenityForm } from './AmenityForm';
import { AmenityItem } from './AmenityItem';

export const Amenity: FC<AmenityProps> = (props) => {
  const { error, fields, onAppend, onRemove, onUpdate } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<SelectedAmenity>({
    amenity: null,
    index: undefined,
  });

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
          Add Amenity
        </ButtonPrimary>
      ) : (
        <AmenityForm
          currentItem={currentItem}
          createHnadler={onAppend}
          updateHnadler={onUpdate}
          closeHandler={() => {
            setIsOpen(false);
            setCurrentItem({ amenity: null, index: undefined });
          }}
        />
      )}

      <div className="flex flex-wrap gap-3">
        {fields.length === 0 ? (
          <div className="w-full">
            <div
              aria-invalid={!!error}
              className="rounded-2xl border-2 border-dashed border-slate-100 py-8 text-center aria-invalid:border aria-invalid:border-red-500"
            >
              <p
                aria-invalid={!!error}
                className="text-sm text-slate-400 aria-invalid:text-red-500"
              >
                No amenity added yet
              </p>
            </div>
            <p className="mt-1 ml-1 h-5 text-xs text-red-500">{error}</p>
          </div>
        ) : (
          fields.map((field, index) => (
            <AmenityItem
              key={index}
              item={field}
              onRemove={() => onRemove(index)}
              onEdit={() => {
                setIsOpen(true);
                setCurrentItem({ amenity: field, index });
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};
