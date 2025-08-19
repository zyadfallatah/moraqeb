"use server";

import db from "@/database";
import { licenses, subscriptions } from "@/database/schema";
import { eq, desc, and, gte, sql, or, asc } from "drizzle-orm";
import { getCurrentUser } from "./authActions";

export const getUserSubscriptions = async (userId: string) => {
  return await db
    .select({
      subscription: subscriptions,
      license: licenses,
    })
    .from(subscriptions)
    .innerJoin(
      licenses,
      eq(subscriptions.licenseNumber, licenses.licenseNumber)
    )
    .where(eq(licenses.userId, userId))
    .orderBy(desc(subscriptions.signDate))
    .limit(1);
};

export const getActiveSubscriptions = async (userId: string) => {
  return await db
    .select({
      subscription: subscriptions,
      license: licenses,
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
};

export const getInActiveSubscriptions = async (userId: string) => {
  const subquery = db
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

  return await db
    .select()
    .from(licenses)
    .where(sql`${licenses.licenseNumber} NOT IN (${subquery})`);
};

export const getAllLicensesIncludeSubscriptions = async (userId: string) => {
  return await db
    .select({
      subscription: subscriptions,
      license: licenses,
    })
    .from(licenses)
    .leftJoin(
      subscriptions,
      eq(subscriptions.licenseNumber, licenses.licenseNumber)
    )
    .where(
      or(eq(licenses.userId, userId), gte(subscriptions.dueDate, new Date()))
    )
    .orderBy(asc(subscriptions.dueDate));
};

export const getLicenseIncludeSubscription = async (licenseNumber: string) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  return await db
    .select({
      subscription: subscriptions,
      license: licenses,
    })
    .from(licenses)
    .leftJoin(
      subscriptions,
      eq(subscriptions.licenseNumber, licenses.licenseNumber)
    )
    .where(
      and(
        eq(licenses.licenseNumber, licenseNumber),
        eq(licenses.userId, currentUser.id)
      )
    )
    .orderBy(desc(subscriptions.dueDate));
};

export const verifyPayment = async ({
  cardNumber,
  cvv,
  expiryDate,
}: {
  cardNumber: string;
  cvv: string;
  expiryDate: string;
}) => {
  if (!cardNumber || !cvv || !expiryDate) {
    return {
      success: false,
      message: "جميع الحقول مطلوبة",
    };
  }

  // Clean card number (remove spaces)
  const cleanCardNumber = cardNumber.replace(/\s/g, "");

  // Simple validation: if card number is 1234 1234 2222 0000, payment is successful
  if (cleanCardNumber === "1234123422220000") {
    return {
      success: true,
      message: "تم الدفع بنجاح",
    };
  }

  // Additional validation for other cards
  // Validate card number length
  if (cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
    return {
      success: false,
      message: "رقم البطاقة غير صحيح",
    };
  }

  // Validate CVV
  if (cvv.length < 3 || cvv.length > 4) {
    return {
      success: false,
      message: "رقم CVV غير صحيح",
    };
  }

  // Validate expiry date format (MM/YY)
  const expiryRegex = /^(\d{2})\/(\d{2})$/;
  if (!expiryRegex.test(expiryDate)) {
    return {
      success: false,
      message: "صيغة تاريخ الانتهاء غير صحيحة",
    };
  }

  // Check if card is expired
  const [month, year] = expiryDate.split("/");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  const expMonth = parseInt(month);
  const expYear = parseInt(year);

  if (
    expYear < currentYear ||
    (expYear === currentYear && expMonth < currentMonth)
  ) {
    return {
      success: false,
      message: "البطاقة منتهية الصلاحية",
    };
  }

  // If all validations pass but it's not the test card, payment fails
  return {
    success: false,
    message: "فشل في عملية الدفع، يرجى التحقق من بيانات البطاقة",
  };
};

export const registerSubscription = async (licenseNumber: string) => {
  try {
    // Calculate due date (1 year from now)
    const dueDate = new Date();
    dueDate.setFullYear(dueDate.getFullYear() + 1);

    await db.insert(subscriptions).values({
      amount: 100, // Fixed subscription amount
      licenseNumber,
      dueDate,
      signDate: new Date(),
    });

    return {
      success: true,
      message: "تم تسجيل الاشتراك بنجاح",
    };
  } catch (error) {
    console.error("Error registering subscription:", error);
    return {
      success: false,
      message: "فشل في تسجيل الاشتراك",
    };
  }
};

export type ActiveLicenseIncludeSubscription = ReturnType<
  typeof getAllLicensesIncludeSubscriptions
>;
