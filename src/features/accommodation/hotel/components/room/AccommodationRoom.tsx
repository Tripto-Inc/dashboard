'use client';

import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { IconBed, IconPlus } from '@tabler/icons-react';
import { FC, useState } from 'react';
import { RoomProps, SelectedRoom } from '../../types/room';
import { AccommodationRoomForm } from './AccommodationRoomForm';
import { AccommodationRoomItem } from './AccommodationRoomItem';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';

export const AccommodationRoom: FC<RoomProps> = (props) => {
  const { error, fields, accommodationId, onAppend, onRemove, onUpdate } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<SelectedRoom>({
    room: null,
    index: undefined,
  });

  return (
    <ModificationFormSection icon={IconBed} title="Available Rooms">
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
            Add Room
          </ButtonPrimary>
        ) : (
          <AccommodationRoomForm
            fields={fields}
            currentItem={currentItem}
            accommodationId={accommodationId}
            createHandler={onAppend}
            updateHandler={onUpdate}
            closeHandler={() => {
              setIsOpen(false);
              setCurrentItem({ room: null, index: undefined });
            }}
          />
        )}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
          {fields.length === 0 ? (
            <div className="w-full sm:col-span-2 md:col-span-3 lg:col-span-1 xl:col-span-2 2xl:col-span-3">
              <div
                aria-invalid={!!error}
                className="rounded-2xl border-2 border-dashed border-slate-100 py-8 text-center aria-invalid:border aria-invalid:border-red-500"
              >
                <p
                  aria-invalid={!!error}
                  className="text-sm text-slate-400 aria-invalid:text-red-500"
                >
                  No room added yet
                </p>
              </div>
              <p className="mt-1 ml-1 h-5 text-xs text-red-500">{error}</p>
            </div>
          ) : (
            fields.map((field, index) => (
              <AccommodationRoomItem
                key={index}
                item={field}
                accommodationId={accommodationId}
                onRemove={() => onRemove(index)}
                onEdit={() => {
                  setIsOpen(true);
                  setCurrentItem({ room: field, index });
                }}
              />
            ))
          )}
        </div>
      </div>
    </ModificationFormSection>
  );
};
