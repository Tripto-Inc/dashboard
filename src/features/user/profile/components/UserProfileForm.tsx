'use client';

import { ModificationFormSection } from '@/components/shared/ModificationFormSection';
import { createMonogram } from '@/features/authentication';
import { getLanguageName } from '@/utils/getLanguageName';
import {
  IconBriefcase,
  IconCalendar,
  IconGlobe,
  IconHelpCircle,
  IconMail,
  IconMapPin,
  IconPhone,
  IconUser,
  IconUsers,
} from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Fragment, type FC } from 'react';
import { UserProfileField } from './UserProfileField';
import { UserProfileFormSkeleton } from './UserProfileFormSkeleton';

export const UserProfileForm: FC = () => {
  const { data: session, status } = useSession();
  const joinedDate =
    session?.user.createdAt &&
    new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(session.user.createdAt));

  const lasLoginDate = session?.user.createdAt
    ? new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(session.createdAt))
    : 'N/A';

  const language = session?.user.locale && getLanguageName(session.user.locale);
  const location = `${session?.user.country}, ${session?.user.region}, ${session?.user.city}`;

  if (status === 'loading') return <UserProfileFormSkeleton />;

  return (
    <Fragment>
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">User Profile</h1>
          <p className="mt-1 text-slate-500">
            View and manage your account settings and preferences.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <div className="h-30 bg-linear-to-r from-blue-600 to-indigo-600" />
            <div className="-mt-12 px-6 pb-6">
              <div className="relative inline-block">
                <div className="h-24 w-24 rounded-2xl bg-white p-1 shadow-xl">
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-blue-100 bg-blue-50 text-3xl font-bold text-blue-600">
                    {session?.user?.image ? (
                      <Image
                        fill
                        alt="Profile Photo"
                        src={session.user.image}
                        className="absolute"
                      />
                    ) : session?.user?.name ? (
                      createMonogram(session.user.name)
                    ) : null}
                  </div>
                </div>
                <div className="absolute -right-1 bottom-2 h-5 w-5 rounded-full border-2 border-white bg-green-500"></div>
              </div>

              <div className="mt-4">
                <h2 className="text-xl font-bold">{session?.user?.name}</h2>
                <p className="text-sm font-medium text-blue-600">Role</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <IconMapPin size={14} />
                  <span>N/A</span>
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Employee ID</span>
                  <span className="font-mono font-medium">N/A</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Status</span>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                    N/A
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Joined</span>
                  <span className="font-medium">{joinedDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="relative overflow-hidden rounded-3xl bg-blue-600 p-6 text-white">
              <div className="relative z-10 flex h-full flex-col">
                <h3 className="mb-2 text-lg font-bold">Need Help?</h3>
                <p className="mb-4 text-sm text-blue-100">
                  Check our documentation for advanced account management and security protocols.
                </p>
                <button
                  type="button"
                  className="mt-auto w-full rounded-xl bg-white py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50"
                >
                  View Guide
                </button>
              </div>

              <div className="absolute -right-4 -bottom-4 rotate-12 transform opacity-20">
                <IconHelpCircle size={120} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <ModificationFormSection
            icon={IconUser}
            title="General Information"
            subtitle="Core identity and contact details"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
              <UserProfileField label="Full Name" value={session?.user?.name} icon={IconUser} />
              <UserProfileField
                label="Email Address"
                value={session?.user?.email}
                icon={IconMail}
              />
              <UserProfileField label="Phone Number" value="N/A" icon={IconPhone} />
              <UserProfileField label="Department" value="N/A" icon={IconUsers} />
              <UserProfileField label="Role" value="N/A" icon={IconBriefcase} />
              <UserProfileField label="Location" value={location} icon={IconMapPin} />
            </div>
          </ModificationFormSection>

          <ModificationFormSection
            icon={IconGlobe}
            iconColor="text-orange-600"
            iconBackground="bg-orange-50"
            title="Account & Preferences"
            subtitle="Regional settings and system status"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
              <UserProfileField label="Preferred Language" value={language} icon={IconGlobe} />
              <UserProfileField label="Last Login" value={lasLoginDate} icon={IconCalendar} />
            </div>
          </ModificationFormSection>
        </div>
      </div>
    </Fragment>
  );
};
