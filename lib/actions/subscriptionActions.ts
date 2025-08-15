"use server";

import db from "@/database";
import { licenses, subscriptions } from "@/database/schema";
import { and, eq, desc } from "drizzle-orm";

export const getUserSubscriptions = async (userId: string) => {
  return await db
    .select()
    .from(subscriptions)
    .where(
      and(
        eq(subscriptions.licenseNumber, licenses.licenseNumber),
        eq(licenses.userId, userId)
      )
    )
    .orderBy(desc(subscriptions.signDate))
    .limit(1);
};

export const isSubscriptionValid = async (licenseNumber: string) => {
  const subscription = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.licenseNumber, licenseNumber))
    .orderBy(desc(subscriptions.dueDate))
    .limit(1);

  if (subscription.length === 0) {
    return false;
  }

  const { dueDate } = subscription[0];

  const now = new Date();

  return now < dueDate;
};
