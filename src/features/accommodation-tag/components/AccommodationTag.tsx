import { FC } from 'react';
import { AccommodationTagProps } from '@/features/accommodation-tag/types';

export const AccommodationTag: FC<AccommodationTagProps> = ({
  title,
  emoji,
  textColor,
  borderColor,
  backgroundColor,
}) => {
  return (
    <div
      className="mt-2 w-fit rounded-full border px-3 py-2"
      style={{ color: textColor, borderColor, backgroundColor }}
    >
      <p className="text-sm">
        {emoji} {title}
      </p>
    </div>
  );
};
