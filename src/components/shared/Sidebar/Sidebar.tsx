'use client';

import { AnimatePresence, motion } from 'motion/react';
import { FC, Fragment } from 'react';
import { SidebarContent } from './SidebarContent';
import { SidebarProps } from './types';

export const Sidebar:FC<SidebarProps> = (props) => {
  const {isOpen,onToggleSidebar} = props
  
  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          <motion.aside
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            initial={{ x: 0 }}
            className="hidden absolute inset-y-0 left-0 z-50 lg:flex w-64 flex-col border-r border-slate-200 bg-white lg:fixed">
            <SidebarContent />
          </motion.aside>
          <Fragment>
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white lg:hidden"
            >
              <SidebarContent />
            </motion.aside>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggleSidebar}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
            />
          </Fragment>
        </Fragment>
      )}
    </AnimatePresence>
  );
}