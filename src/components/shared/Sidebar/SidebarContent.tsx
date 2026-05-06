import Image from 'next/image';
import { Fragment } from 'react';
import { inventoryItems, mainMenuItems, systemItems } from './lib';
import { SidebarSection } from './SidebarSection';

export const SidebarContent = () => {
  return (
    <Fragment>
      <div className="relative my-6 flex h-8 w-36 items-center gap-2">
        <Image fill loading="eager" src="/logo.svg" alt="Tripto Logo" className="absolute h-full" />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 pt-2">
        <SidebarSection title="Main Menu" items={mainMenuItems} />
        <SidebarSection title="Inventory" items={inventoryItems} className="mt-4" />
        <SidebarSection title="System" items={systemItems} className="mt-4" />
      </nav>
    </Fragment>
  );
};
