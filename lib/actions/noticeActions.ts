"use server";

import db from "@/database";
import { notices, licenses, subscriptions } from "@/database/schema";
import type { License, Notice } from "@/database/schema";
import { eq, and, isNull, gte, desc, sql } from "drizzle-orm";

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

type LicenseWithNoticeType = License & {
  noticeType: Notice["type"] | "info";
  noticeMessage: Notice["message"];
};
const byLicense = new Map<string, LicenseWithNoticeType>();

export const getActiveLicensesWithNoticeType = async (userId: string) => {
  try {
    const subqueryActiveLicenses = db
      .select({
        licenses: licenses.licenseNumber,
      })
      .from(subscriptions)
      .innerJoin(
        licenses,
        eq(subscriptions.licenseNumber, licenses.licenseNumber)
      )
      .where(
        and(eq(licenses.userId, userId), gte(subscriptions.dueDate, new Date()))
      )
      .orderBy(desc(subscriptions.dueDate));

    const result = await db
      .select()
      .from(licenses)
      .leftJoin(notices, eq(licenses.licenseNumber, notices.licenseNumber))
      .where(
        and(
          sql`${licenses.licenseNumber} IN ${subqueryActiveLicenses}`,
          isNull(notices.resolved)
        )
      );

    for (const row of result) {
      const licenseNumberKey = row.licenses.licenseNumber;
      if (!byLicense.has(licenseNumberKey)) {
        byLicense.set(licenseNumberKey, {
          ...row.licenses,
          noticeType: row.notices?.type ?? "info",
          noticeMessage: row.notices?.message ?? "",
        });
      }
    }

    return Array.from(byLicense.values());
  } catch (error) {
    console.error(error);
  }
};

export type ActiveLicenseWithNoticeType = ReturnType<
  typeof getActiveLicensesWithNoticeType
>;

export const getActiveLicenseWithNoticeType = async (
  userId: string,
  licenseNumber: string
) => {
  try {
    const result = await db
      .select()
      .from(licenses)
      .leftJoin(notices, eq(licenses.licenseNumber, notices.licenseNumber))
      .where(
        and(
          eq(licenses.licenseNumber, licenseNumber),
          eq(licenses.userId, userId),
          isNull(notices.resolved)
        )
      );

    if (result.length === 0) {
      return null;
    }

    // Get the first result since we're looking for a specific license
    const row = result[0];

    return {
      ...row.licenses,
      noticeType: row.notices?.type ?? "info",
      noticeMessage: row.notices?.message ?? "",
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
