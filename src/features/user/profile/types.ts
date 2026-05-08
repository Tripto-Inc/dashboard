import { FC, SVGProps } from 'react';

export type UserProfileFieldProps = {
  label: string;
  value?: string | null;
  icon: FC<SVGProps<SVGSVGElement>>;
};
