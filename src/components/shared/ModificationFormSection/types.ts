import { Icon } from '@tabler/icons-react';
import { PropsWithChildren, ReactNode } from 'react';

export interface ModificationFormSectionProps extends PropsWithChildren {
  icon: Icon;
  iconColor?: string;
  iconBackground?: string;
  title: string;
  subtitle?: string;
  headerExtraElements?: ReactNode;
}
