"use server";

import db from "@/database";
import { recommendations, notices, licenses } from "@/database/schema";
import { eq, and, desc, isNull } from "drizzle-orm";
import { getCurrentUser } from "./authActions";

/**
 * Get recommendation based on notice number and authenticate with user ID
 * @param noticeId - The ID of the notice to get recommendations for
 * @returns Promise<Array> - Array of recommendations for the authenticated user
 */
export async function getRecommendationsByNoticeId(noticeId: string) {
  try {
    // Get current authenticated user
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    // Get recommendations for the specific notice, ensuring the user owns the license
    const result = await db
      .select({
        recommendation: recommendations,
        notice: notices,
        license: licenses,
      })
      .from(recommendations)
      .innerJoin(notices, eq(recommendations.noticeId, notices.id))
      .innerJoin(licenses, eq(notices.licenseNumber, licenses.licenseNumber))
      .where(
        and(
          eq(recommendations.noticeId, noticeId),
          eq(licenses.userId, currentUser.id)
        )
      );

    if (result.length === 0) {
      return null;
    }

    // Return the recommendations with notice and license information
    return result;
  } catch (error) {
    console.error("Error getting recommendations by notice ID:", error);
    throw error;
  }
}

/**
 * Get recommendations for a specific license number (authenticated user only)
 * @param licenseNumber - The license number to get recommendations for
 * @returns Promise<Array> - Array of recommendations for the specific license
 */
export async function getRecommendationsByLicenseNumber(licenseNumber: string) {
  try {
    // Get current authenticated user
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    // Get recommendations for the specific license, ensuring the user owns it
    const result = await db
      .select({
        recommendation: recommendations,
        notice: notices,
        license: licenses,
      })
      .from(recommendations)
      .innerJoin(notices, eq(recommendations.noticeId, notices.id))
      .innerJoin(licenses, eq(notices.licenseNumber, licenses.licenseNumber))
      .where(
        and(
          and(
            eq(licenses.licenseNumber, licenseNumber),
            eq(licenses.userId, currentUser.id)
          ),
          isNull(notices.resolved)
        )
      )
      .orderBy(desc(notices.sentDate));

    if (result.length === 0) {
      return [];
    }

    // Return the recommendations with notice and license information
    return result;
  } catch (error) {
    console.error("Error getting recommendations by license number:", error);
    throw error;
  }
}
