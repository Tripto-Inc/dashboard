import {
  IconBuildingEstate,
  IconCalendar,
  IconCategory,
  IconCurrencyDollar,
  IconHome,
  IconMapPin,
  IconSettings,
  IconTag,
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
    icon: IconMapPin,
    id: 'destinations',
    href: '/destinations',
    label: 'Destinations',
  },
  {
    id: 'currencies',
    href: '/currencies',
    label: 'Currencies',
    icon: IconCurrencyDollar,
  },
  {
    id: 'activities',
    icon: IconTicket,
    href: '/activities',
    label: 'Activities',
  },
  {
    icon: IconCategory,
    id: 'activityTypes',
    href: '/activity-types',
    label: 'Activity Types',
  },
  {
    icon: IconTag,
    id: 'accommodationTags',
    href: '/accommodation-tags',
    label: 'Accommodation Tags',
  },
  {
    id: 'accommodations',
    href: '/accommodations',
    label: 'Accommodations',
    icon: IconBuildingEstate,
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
