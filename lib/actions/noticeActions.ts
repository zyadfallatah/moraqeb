"use server";

import db from "@/database";
import { notices, licenses, subscriptions } from "@/database/schema";
import type { License, Notice } from "@/database/schema";
import { eq, and, isNull, gte, desc } from "drizzle-orm";

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

export const getActiveLicensesWithNoticeType = async (userId: string) => {
  try {
    type LicenseWithNoticeType = License & {
      noticeType: Notice["type"] | "info";
    };
    const byLicense = new Map<string, LicenseWithNoticeType>();

    // for (const row of activeLicenses) {
    //   const licenseNumberKey = row.license.licenseNumber;
    //   if (!byLicense.has(licenseNumberKey)) {
    //     byLicense.set(licenseNumberKey, {
    //       ...row.license,
    //       noticeType: row.notice?.type ?? "info",
    //     });
    //   }
    // }

    return Array.from(byLicense.values());
  } catch (error) {
    console.error(error);
  }
};

export type ActiveLicenseWithNoticeType = ReturnType<
  typeof getActiveLicensesWithNoticeType
>;
