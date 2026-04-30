import clsx from 'clsx';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { SidebarItemProps } from './types';

export const SidebarItem: FC<SidebarItemProps> = (props) => {
    const { href, label, disabled, icon: Icon } = props;
    const pathname = usePathname();

    const isActive =
        pathname === href || pathname.startsWith(`${href}/`);

    const commonClasses = clsx(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
        disabled && "opacity-20 cursor-not-allowed pointer-events-none",
        !disabled &&
        (isActive
            ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900")
    );

    const content = (
        <>
            <Icon size={20} />
            <span className="font-medium text-sm">{label}</span>

            {isActive && !disabled && (
                <motion.div
                    layoutId="active-pill"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                />
            )}
        </>
    );

    if (disabled) {
        return <div className={commonClasses}>{content}</div>;
    }

    return (
        <Link href={href} className={commonClasses}>
            {content}
        </Link>
    );
};