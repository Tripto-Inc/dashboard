import {
  IconBuildingEstate,
  IconCalendar,
  IconCategory,
  IconCurrencyDollar,
  IconHome,
  IconMapPin,
  IconSettings,
  IconTicket,
} from '@tabler/icons-react';

export const mainMenuItems = [
  {
    href: '/',
    icon: IconHome,
    id: 'dashboard',
    label: 'Dashboard',
  },
  {
    href: '',
    disabled: true,
    icon: IconCalendar,
    id: 'reservations',
    label: 'Reservations',
  },
];

export const inventoryItems = [
  {
    disabled: true,
    icon: IconMapPin,
    id: 'destinations',
    href: '/destinations',
    label: 'Destinations',
  },
  {
    id: 'listings',
    href: '/listings',
    label: 'Listings',
    icon: IconBuildingEstate,
  },
  {
    id: 'activities',
    icon: IconTicket,
    href: '/activities',
    label: 'Activities',
  },
  {
    id: 'currencies',
    href: '/currencies',
    label: 'Currencies',
    icon: IconCurrencyDollar,
  },
  {
    icon: IconCategory,
    id: 'activityTypes',
    href: '/activity-types',
    label: 'Activity Types',
  },
];

export const systemItems = [
  {
    href: '',
    id: 'settings',
    disabled: true,
    label: 'Settings',
    icon: IconSettings,
  },
];
