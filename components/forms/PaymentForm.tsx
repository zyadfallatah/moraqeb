"use client";
import {
  verifyPayment,
  registerMultipleSubscriptions,
} from "@/lib/actions/subscriptionActions";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const PaymentForm = ({
  selectedLicenses,
  userId,
}: {
  selectedLicenses: string[];
  userId: string;
}) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [touched, setTouched] = useState({
    cardNumber: false,
    expiryDate: false,
    cvv: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentResult, setPaymentResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Format card number with spaces every 4 digits
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "").replace(/\D/g, "");
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(" ") : cleaned;
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      const month = cleaned.slice(0, 2);
      const year = cleaned.slice(2, 4);

      // Validate month is between 01-12
      const monthNum = parseInt(month);
      if (monthNum < 1 || monthNum > 12) {
        return cleaned.slice(0, 2); // Only return month if invalid
      }

      return month + "/" + year;
    }
    return cleaned;
  };

  // Validate card number format and check for test card
  const validateCardNumber = (cardNumber: string) => {
    const cleaned = cardNumber.replace(/\s/g, "");

    // Check if it's the test card
    if (cleaned === "1234123422220000") {
      return "";
    }

    if (cleaned.length < 13 || cleaned.length > 19) {
      return "رقم البطاقة يجب أن يكون بين 13 و 19 رقم";
    }

    // Basic format validation - only numbers and spaces allowed
    if (!/^[\d\s]+$/.test(cardNumber)) {
      return "رقم البطاقة يجب أن تحتوي على أرقام فقط";
    }

    return "";
  };

  // Validate expiry date
  const validateExpiryDate = (expiryDate: string) => {
    if (!expiryDate) return "تاريخ الانتهاء مطلوب";

    const [month, year] = expiryDate.split("/");
    if (!month || !year) return "صيغة التاريخ غير صحيحة";

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
    const currentMonth = currentDate.getMonth() + 1;

    const expMonth = parseInt(month);
    const expYear = parseInt(year);

    if (expMonth < 1 || expMonth > 12) return "الشهر يجب أن يكون بين 01 و 12";
    if (expYear < currentYear) return "تاريخ الانتهاء منتهي الصلاحية";
    if (expYear === currentYear && expMonth < currentMonth)
      return "تاريخ الانتهاء منتهي الصلاحية";

    return "";
  };

  // Validate CVV
  const validateCVV = (cvv: string) => {
    if (!cvv) return "رقم CVV مطلوب";
    if (cvv.length < 3 || cvv.length > 4)
      return "رقم CVV يجب أن يكون 3 أو 4 أرقام";
    if (!/^\d+$/.test(cvv)) return "رقم CVV يجب أن يحتوي على أرقام فقط";
    return "";
  };

  const clearFormData = () => {
    setFormData({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
    setErrors({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
    setTouched({
      cardNumber: false,
      expiryDate: false,
      cvv: false,
    });
    setPaymentResult(null);
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;

    switch (field) {
      case "cardNumber":
        // Only allow numbers and spaces
        if (!/^[\d\s]*$/.test(value)) return;
        formattedValue = formatCardNumber(value);
        break;
      case "expiryDate":
        // Only allow numbers and forward slash
        if (!/^[\d/]*$/.test(value)) return;
        formattedValue = formatExpiryDate(value);
        break;
      case "cvv":
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;
        formattedValue = value.slice(0, 4); // Max 4 digits
        break;
    }

    setFormData((prev) => ({ ...prev, [field]: formattedValue }));

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Clear payment result when user starts typing
    if (paymentResult) {
      setPaymentResult(null);
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    let error = "";
    switch (field) {
      case "cardNumber":
        error = validateCardNumber(formData.cardNumber);
        break;
      case "expiryDate":
        error = validateExpiryDate(formData.expiryDate);
        break;
      case "cvv":
        error = validateCVV(formData.cvv);
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const cardNumberError = validateCardNumber(formData.cardNumber);
    const expiryDateError = validateExpiryDate(formData.expiryDate);
    const cvvError = validateCVV(formData.cvv);

    setErrors({
      cardNumber: cardNumberError,
      expiryDate: expiryDateError,
      cvv: cvvError,
    });

    setTouched({
      cardNumber: true,
      expiryDate: true,
      cvv: true,
    });

    // If no errors, proceed with submission
    if (!cardNumberError && !expiryDateError && !cvvError) {
      setIsSubmitting(true);
      setPaymentResult(null);

      try {
        const { cardNumber, expiryDate, cvv } = formData;
        const result = await verifyPayment({ cardNumber, cvv, expiryDate });
        setPaymentResult(result);

        if (result.success) {
          try {
            // Register subscriptions for all selected licenses in a single transaction
            const subscriptionResult = await registerMultipleSubscriptions(
              selectedLicenses
            );

            if (subscriptionResult.success) {
              clearFormData(); // Clear sensitive form data
              setIsSuccess(true);
            } else {
              setPaymentResult({
                success: false,
                message: subscriptionResult.message,
              });
            }
          } catch (error) {
            console.error("Failed to register subscriptions:", error);
            setPaymentResult({
              success: false,
              message: "تم الدفع بنجاح ولكن فشل في تسجيل الاشتراكات",
            });
          }
        }
      } catch (error) {
        setPaymentResult({
          success: false,
          message: "حدث خطأ أثناء معالجة الدفع",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Show success view if payment was successful
  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-semibold text-primary mt-10">
          تم الدفع بنجاح!
        </h1>
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl text-green-800 mb-4">
            تم تسجيل الاشتراكات بنجاح
          </h2>
          <p className="text-green-700 mb-6">
            تم تفعيل {selectedLicenses.length} رخصة مراقب
          </p>
          <Link
            href="/lands"
            type="button"
            className="bg-primary text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            العودة لصفحة الأراضي
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-center md:text-right mb-2 text-4xl font-semibold text-primary mt-10">
        تأكيد الدفع
      </h1>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-center md:text-right text-2xl text-primary-dark mb-5">
          طرق الدفع المتاحة
        </h2>

        <div className="mb-5 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            ملخص الطلب
          </h3>
          <p className="text-blue-700">
            عدد الأراضي المختارة: {selectedLicenses.length}
          </p>
          <p className="text-blue-700">
            إجمالي المبلغ: {selectedLicenses.length * 100} ريال
          </p>
        </div>

        <div className="flex gap-5 mb-5">
          <Image
            src="/assets/credit-card.svg"
            alt="card"
            width={60}
            height={60}
            className="w-fit bg-[#C5EDEB] p-1 rounded-2xl border border-primary"
          />
          <Image
            src="/assets/credit-card.svg"
            alt="card"
            width={60}
            height={60}
            className="w-fit p-1 rounded-2xl border border-gray-500"
          />
        </div>

        {/* Payment Result Message */}
        {paymentResult && (
          <div
            className={`mb-5 p-4 rounded-md ${
              paymentResult.success
                ? "bg-green-100 border border-green-400 text-green-700"
                : "bg-red-100 border border-red-400 text-red-700"
            }`}
          >
            {paymentResult.message}
          </div>
        )}

        <div className="mb-5">
          <label htmlFor="card-number" className="text-lg mb-2 block">
            رقم بطاقة
          </label>
          <div
            className={`border flex border-gray-700 rounded-md p-1 px-3 min-h-[50px] ${
              touched.cardNumber && errors.cardNumber ? "border-red-500" : ""
            }`}
          >
            <Image
              src="/assets/card.svg"
              alt="card number"
              width={40}
              height={40}
            />
            <input
              type="text"
              id="card-number"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              onBlur={() => handleBlur("cardNumber")}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              className="border-none shadow-none bg-transparent ml-2 w-full outline-none focus:outline-none px-3"
            />
          </div>
          {touched.cardNumber && errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
          )}
        </div>

        <div className="flex gap-5">
          <div className="flex-1">
            <label htmlFor="expiry-date" className="text-lg mb-2 block">
              تاريخ الانتهاء
            </label>
            <div
              className={`border flex border-gray-700 rounded-md p-1 px-3 min-h-[50px] ${
                touched.expiryDate && errors.expiryDate ? "border-red-500" : ""
              }`}
            >
              <input
                type="text"
                id="expiry-date"
                value={formData.expiryDate}
                onChange={(e) =>
                  handleInputChange("expiryDate", e.target.value)
                }
                onBlur={() => handleBlur("expiryDate")}
                placeholder="MM/YY"
                maxLength={5}
                className="border-none shadow-none bg-transparent ml-2 w-full outline-none focus:outline-none"
              />
            </div>
            {touched.expiryDate && errors.expiryDate && (
              <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="cvv" className="text-lg mb-2 block">
              رقم CVV
            </label>
            <div
              className={`border flex border-gray-700 rounded-md p-1 px-3 min-h-[50px] ${
                touched.cvv && errors.cvv ? "border-red-500" : ""
              }`}
            >
              <input
                type="text"
                id="cvv"
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                onBlur={() => handleBlur("cvv")}
                placeholder="000"
                maxLength={4}
                className="border-none shadow-none bg-transparent ml-2 w-full outline-none focus:outline-none px-3"
              />
              <Image
                src="/assets/close-eye.svg"
                alt="CVV"
                width={40}
                height={40}
              />
            </div>
            {touched.cvv && errors.cvv && (
              <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            disabled={
              !formData.cardNumber ||
              !formData.expiryDate ||
              !formData.cvv ||
              isSubmitting
            }
            type="submit"
            className="w-full bg-primary text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "جاري المعالجة..." : "تأكيد الدفع"}
          </button>
        </div>

        {/* Test Credentials Section */}
        <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-3 text-center">
            بيانات الاختبار
          </h3>
          <div className="space-y-3 text-sm text-green-700">
            <div className="text-center mb-3">
              <p className="font-medium">البطاقة الناجحة:</p>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">رقم البطاقة:</span>
              <span className="font-mono bg-green-100 px-2 py-1 rounded">
                1234 1234 2222 0000
              </span>
            </div>
            <div className="text-center mt-3 p-2 bg-blue-50 border border-blue-200 rounded">
              <p className="text-blue-700 text-xs">
                البطاقات الأخرى تحتاج فقط إلى تنسيق صحيح (13-19 رقم)
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
