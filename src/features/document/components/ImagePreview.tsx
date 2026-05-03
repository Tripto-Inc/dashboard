import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { ConfirmDeleteAlert } from '@/components/shared/ConfirmDeleteAlert';
import { IconX } from '@tabler/icons-react';
import Image from 'next/image';
import { FC, useState } from 'react';
import { ImagePreviewProps } from '../types';
import clsx from 'clsx';

export const ImagePreview: FC<ImagePreviewProps> = (props) => {
  const [failed, setFailed] = useState(false);
  const { src, title = '', className, onDelete } = props;

  if (!src || failed) return;

  return (
    <div className={clsx('group relative overflow-hidden', className)}>
      <Image
        fill
        src={src}
        alt={title}
        className="absolute h-full w-full object-cover"
        onError={() => setFailed(true)}
      />

      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
        <ConfirmDeleteAlert onDelete={onDelete}>
          <ButtonPrimary type="button" size="icon" color="red">
            <IconX size={20} />
          </ButtonPrimary>
        </ConfirmDeleteAlert>
      </div>
    </div>
  );
};
