import clsx from 'clsx';
import { FC } from 'react';
import { ModificationFormSectionProps } from './types';

export const ModificationFormSection: FC<ModificationFormSectionProps> = (props) => {
  const {
    title,
    subtitle,
    children,
    icon: Icon,
    headerExtraElements,
    iconColor = 'text-blue-600',
    iconBackground = 'bg-blue-50',
  } = props;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8">
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              'flex size-10 items-center justify-center rounded-xl',
              iconColor,
              iconBackground,
            )}
          >
            <Icon size={20} />
          </div>
          <div>
            <h3 className="text-lg leading-5 font-bold">{title}</h3>
            <p className="text-xs text-slate-400">{subtitle}</p>
          </div>
        </div>
        {headerExtraElements}
      </div>
      {children}
    </div>
  );
};
