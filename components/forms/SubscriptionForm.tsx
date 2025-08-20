"use client";

import { License } from "@/database/schema";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import Payment from "./PaymentForm";

const SubscriptionForm = ({
  licenses,
  userId,
}: {
  licenses: License[];
  userId: string;
}) => {
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const handleLicenseToggle = (licenseNumber: string) => {
    setSelectedLicenses((prev) =>
      prev.includes(licenseNumber)
        ? prev.filter((id) => id !== licenseNumber)
        : [...prev, licenseNumber]
    );
  };

  return (
    <>
      {step === 1 && (
        <>
          <h1 className="text-4xl md:text-6xl font-semibold text-primary text-center mt-10">
            رخــصـــــة مُــــرَقِّــــــب
          </h1>
          <h2 className="text-2xl md:text-3xl text-center font-extralight my-7">
            إختر الأراضي التي تريد الحصول على رخصة مرقب لها
          </h2>
          <div className="grid md:grid-cols-3 gap-3">
            {licenses.map((license) => (
              <div key={license.licenseNumber} className="relative">
                <input
                  type="checkbox"
                  name="land"
                  id={license.licenseNumber}
                  value={license.licenseNumber}
                  checked={selectedLicenses.includes(license.licenseNumber)}
                  onChange={() => handleLicenseToggle(license.licenseNumber)}
                  className="sr-only" // This hides the checkbox
                />
                <label
                  htmlFor={license.licenseNumber}
                  className={`
                block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                ${
                  selectedLicenses.includes(license.licenseNumber)
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-gray-300 hover:border-primary/50 hover:bg-gray-50"
                }
              `}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-3">
                      <Image
                        src="/assets/logo.svg"
                        alt="land"
                        width={40}
                        height={40}
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {`قطعة ${license.landNumber}`}
                        </div>
                        <div className="text-sm text-gray-600">
                          {license.district}
                        </div>
                      </div>
                    </div>

                    <div className="flex mr-auto gap-2">
                      <div
                        className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center
                  ${
                    selectedLicenses.includes(license.licenseNumber)
                      ? "border-primary bg-primary"
                      : "border-gray-400"
                  }
                `}
                      >
                        {selectedLicenses.includes(license.licenseNumber) && (
                          <div className="w-2.5 h-2.5 bg-white"></div>
                        )}
                      </div>
                      <span>اختر</span>
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </>
      )}
      {step === 2 && (
        <Payment userId={userId} selectedLicenses={selectedLicenses} />
      )}
      {step === 1 && (
        <Button
          className="mx-auto mt-5 px-20 py-6.5 text-2xl w-fit cursor-pointer"
          type="button"
          onClick={() =>
            setStep(() => {
              return step + 1;
            })
          }
          disabled={selectedLicenses.length === 0}
        >
          المتابعة
        </Button>
      )}
    </>
  );
};

export default SubscriptionForm;
