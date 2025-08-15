"use server";

import db from "@/database";
import { notices } from "@/database/schema";
import { eq, and, isNull } from "drizzle-orm";

export const getLicenseNotices = async (licenseNumber: string) => {
  try {
    const result = await db
      .select()
      .from(notices)
      .where(
        and(eq(notices.licenseNumber, licenseNumber), isNull(notices.resolved))
      );

    if (result.length === 0) {
      return null;
    }

    return result;
  } catch (error) {
    console.error(error);
  }
};
