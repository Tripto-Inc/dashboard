import Image from 'next/image';
import { inventoryItems, mainMenuItems, systemItems } from './lib';
import { SidebarSection } from './SidebarSection';
import { Fragment } from 'react/jsx-runtime';

export const SidebarContent = () => {
  return (
    <Fragment>
      <div className="relative my-6 flex h-8 w-36 items-center gap-2">
        <Image
          fill
          loading="eager"
          src="/logo.svg"
          alt="Tripto Logo"
          className="absolute h-full"
        />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 pt-2">
        <SidebarSection title="Main Menu" items={mainMenuItems} />
        <SidebarSection title="Inventory" items={inventoryItems} className="mt-4" />
        <SidebarSection title="System" items={systemItems} className="mt-4" />
      </nav>

      <div className="border-t border-slate-100 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
            AK
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Ali Kouhfar</p>
            <p className="truncate text-xs text-slate-500">Admin</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

