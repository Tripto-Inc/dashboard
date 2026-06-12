import SpringIcon from '@/assets/icons/seasons/spring.svg';
import SummerIcon from '@/assets/icons/seasons/summer.svg';
import AutumnIcon from '@/assets/icons/seasons/autumn.svg';
import WinterIcon from '@/assets/icons/seasons/winter.svg';

export const SEASONS = [
  {
    value: 'SPRING',
    title: 'Spring Picks',
    description: 'Fresh blooms and mild weather.',
    className: 'border-emerald-600 text-emerald-600 bg-emerald-50/50',
    icon: SpringIcon,
  },
  {
    value: 'SUMMER',
    title: 'Summer Hotspot',
    description: 'Perfect for sunny adventures.',
    className: 'border-yellow-600 text-yellow-600 bg-yellow-50/50',
    icon: SummerIcon,
  },
  {
    value: 'AUTUMN',
    title: 'Autumn Escape',
    description: 'Cozy stays surrounded by fall colors.',
    className: 'border-orange-600 text-orange-600 bg-orange-50/50',
    icon: AutumnIcon,
  },
  {
    value: 'WINTER',
    title: 'Winter Getaway',
    description: 'Snowy retreats and warm comfort.',
    className: 'border-blue-600 text-blue-600 bg-blue-50/50',
    icon: WinterIcon,
  },
];
