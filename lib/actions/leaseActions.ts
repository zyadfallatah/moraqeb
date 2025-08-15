"use server";

import db from "@/database";
import { licenses } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getUserLeases = async (userId: string) => {
  return await db.select().from(licenses).where(eq(licenses.userId, userId));
};

export const getLease = async (licenseNumber: string) => {
  return await db
    .select()
    .from(licenses)
    .where(eq(licenses.licenseNumber, licenseNumber));
};
