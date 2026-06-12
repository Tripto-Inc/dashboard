'use client';

import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { IconPlus, IconShieldCheck } from '@tabler/icons-react';
import { FC, useState } from 'react';
import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import {
  AccommodationPolicyProps,
  SelectedAccommodationPolicy,
} from '@/features/accommodation/types/accommodationPolicy';
import { AccommodationPolicyForm } from '@/features/accommodation/components/policy/AccommodationPolicyForm';
import { AccommodationPolicyItem } from '@/features/accommodation/components/policy/AccommodationPolicyItem';

export const AccommodationPolicy: FC<AccommodationPolicyProps> = (props) => {
  const { error, fields, onAppend, onRemove, onUpdate } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<SelectedAccommodationPolicy>({
    policy: null,
    index: undefined,
  });

  return (
    <ModificationFormSection icon={IconShieldCheck} title="Policies">
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
            Add Policy
          </ButtonPrimary>
        ) : (
          <AccommodationPolicyForm
            currentItem={currentItem}
            createHandler={onAppend}
            updateHandler={onUpdate}
            closeHandler={() => {
              setIsOpen(false);
              setCurrentItem({ policy: null, index: undefined });
            }}
          />
        )}

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {fields.length === 0 ? (
            <div className="sm:col-span-2 lg:col-span-1">
              <div
                aria-invalid={!!error}
                className="rounded-2xl border-2 border-dashed border-slate-100 py-8 text-center aria-invalid:border aria-invalid:border-red-500"
              >
                <p
                  aria-invalid={!!error}
                  className="text-sm text-slate-400 aria-invalid:text-red-500"
                >
                  No policy added yet
                </p>
              </div>
              <p className="mt-1 ml-1 h-5 text-xs text-red-500">{error}</p>
            </div>
          ) : (
            fields.map((field, index) => (
              <AccommodationPolicyItem
                key={index}
                item={field}
                onRemove={() => onRemove(index)}
                onEdit={() => {
                  setIsOpen(true);
                  setCurrentItem({ policy: field, index });
                }}
              />
            ))
          )}
        </div>
      </div>
    </ModificationFormSection>
  );
};
