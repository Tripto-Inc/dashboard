'use server';

import { deleteDocument, uploadDocument } from '@/features/document';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { ACTIVITY_ERRORS } from '../constants';
import { ActivityFormData } from '../types';

export const createActivity = async (data: ActivityFormData, heroImage?: File | null) => {
  const bucket = 'activities';
  const existing = await prisma.activity.findUnique({
    where: {
      title_activityTypeId: {
        title: data.title,
        activityTypeId: data.activityTypeId,
      },
    },
  });

  if (existing) throw new Error(ACTIVITY_ERRORS.DUPLICATE);

  const activity = await prisma.activity.create({
    data: {
      title: data.title,
      price: data.price,
      discount: data.discount,
      isActive: data.isActive,

      currency: {
        connect: { id: data.currencyId },
      },

      activityType: {
        connect: { id: data.activityTypeId },
      },

      address: {
        connectOrCreate: {
          where: {
            countryCode_city_details: {
              city: data.city,
              details: data.addressDetails,
              countryCode: data.countryCode,
            },
          },
          create: {
            city: data.city,
            country: data.country,
            details: data.addressDetails,
            countryCode: data.countryCode,
          },
        },
      },
    },
  });

  if (heroImage) {
    const uploadResult = await uploadDocument({
      bucket,
      file: heroImage,
      object: `${activity.id}/hero.webp`,
    });

    if (!uploadResult.success)
      throw new Error('Activity created successfully, but hero image upload failed.');
  }

  return activity;
};

export const updateActivity = async (
  id: string,
  data: ActivityFormData,
  heroImage?: File | null,
) => {
  const bucket = 'activities';
  const object = `${id}/hero.webp`;

  if (!id) throw new Error(ACTIVITY_ERRORS.ID_REQUIRED);

  const existing = await prisma.activity.findUnique({ where: { id } });

  if (!existing) throw new Error(ACTIVITY_ERRORS.NOT_FOUND);

  const activity = await prisma.activity.update({
    where: { id },
    data: {
      title: data.title,
      price: data.price,
      discount: data.discount,
      isActive: data.isActive,

      currency: {
        connect: { id: data.currencyId },
      },

      activityType: {
        connect: { id: data.activityTypeId },
      },

      address: {
        connectOrCreate: {
          where: {
            countryCode_city_details: {
              city: data.city,
              details: data.addressDetails,
              countryCode: data.countryCode,
            },
          },
          create: {
            city: data.city,
            country: data.country,
            details: data.addressDetails,
            countryCode: data.countryCode,
          },
        },
      },
      updatedAt: new Date(),
    },
  });

  if (heroImage) {
    const uploadResult = await uploadDocument({
      bucket,
      object,
      file: heroImage,
    });

    if (!uploadResult.success)
      throw new Error('Activity created successfully, but hero image upload failed.');
  }

  revalidatePath(`/activities/edit/${id}`);
  return activity;
};

export const deleteActivity = async (id: string) => {
  const bucket = 'activities';
  const object = `${id}/hero.webp`;

  const existing = await prisma.activity.findUnique({ where: { id } });

  if (!existing) throw new Error(ACTIVITY_ERRORS.NOT_FOUND);

  await prisma.activity.delete({ where: { id } });
  await prisma.address.delete({ where: { id: existing.addressId } });
  await deleteDocument({ bucket, object }).catch(() => {
    throw new Error('Activity deleted, but hero image could not be removed.');
  });

  return existing.id;
};
