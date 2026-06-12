import { Icon } from '@tabler/icons-react';
import { PropsWithChildren, ReactNode } from 'react';

export type ModificationFormSectionProps = PropsWithChildren & {
  icon: Icon;
  iconColor?: string;
  iconBackground?: string;
  title: string;
  subtitle?: string;
  headerExtraElements?: ReactNode;
};

export type ModificationFormSectionSkeletonProps = PropsWithChildren & {
  hasSubtitle?: boolean;
  headerExtraElements?: ReactNode;
};
