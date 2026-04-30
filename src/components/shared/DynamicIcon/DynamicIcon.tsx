import * as Icons from '@tabler/icons-react';
import { LucideProps } from 'lucide-react';

interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  // @ts-ignore
  const IconComponent = Icons[name];

  if (!IconComponent) return null;

  return <IconComponent {...props} />;
}
