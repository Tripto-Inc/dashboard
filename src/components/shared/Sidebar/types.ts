export type SidebarProps = {
  isOpen: boolean;
  onToggleSidebar: () => void;
};

export type SidebarItemProps = {
  icon: any;
  label: string;
  href: string;
  disabled?: boolean;
};
