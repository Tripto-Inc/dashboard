'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { ACTIVITY_TYPE_ERRORS } from '../constants';
import { ActivityTypeFormData } from '../types';

export const createActivityType = async (data: ActivityTypeFormData) => {
  const existing = await prisma.activityType.findUnique({
    where: {
      name_title: {
        name: data.name,
        title: data.title,
      },
    },
  });

  if (existing) throw new Error(ACTIVITY_TYPE_ERRORS.DUPLICATE_NAME_TITLE);

  const activityType = await prisma.activityType.create({
    data: {
      name: data.name,
      icon: data.icon,
      title: data.title,
      emoji: data.emoji,
      isActive: data.isActive,
    },
  });

  return activityType;
};

export const updateActivityType = async (id: string, data: ActivityTypeFormData) => {
  if (!id) throw new Error(ACTIVITY_TYPE_ERRORS.ID_REQUIRED);

  const existing = await prisma.activityType.findUnique({ where: { id } });

  if (!existing) throw new Error(ACTIVITY_TYPE_ERRORS.NOT_FOUND);

  const activityType = await prisma.activityType.update({
    where: { id },
    data: {
      name: data.name,
      icon: data.icon,
      title: data.title,
      emoji: data.emoji,
      isActive: data.isActive,
      updatedAt: new Date(),
    },
  });

  revalidatePath(`/activity-types/edit/${id}`);
  return activityType;
};

export const deleteActivityType = async (id: string) => {
  const existing = await prisma.activityType.findUnique({ where: { id } });

  if (!existing) throw new Error(ACTIVITY_TYPE_ERRORS.NOT_FOUND);

  await prisma.activityType.delete({ where: { id } });

  return existing.id;
};
