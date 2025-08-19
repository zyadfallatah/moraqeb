import { ReactNode } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { getCurrentUser } from "@/lib/actions/authActions";
import NotSignup from "./NotSignup";
import {
  getActiveSubscriptions,
  getLicenseIncludeSubscription,
} from "@/lib/actions/subscriptionActions";
import Image from "next/image";

interface Props {
  children?: ReactNode;
  byLicnese?: string;
  isActiveSubscription?: boolean;
}

const OnlySubscribed = async ({
  children,
  byLicnese,
  isActiveSubscription,
}: Props) => {
  const user = await getCurrentUser();

  if (!user) return <NotSignup />;

  let getLicenses;

  if (!byLicnese) {
    getLicenses = await getActiveSubscriptions(user.id);
  } else {
    getLicenses = await getLicenseIncludeSubscription(byLicnese);
  }
  const isSubscribed = getLicenses!.length > 0;

  if (isActiveSubscription === false) {
    return (
      <div className="shadow bg-white w-fit min-w-[400px] p-5 border">
        <div className="blur-[2px]">
          <div className="flex gap-4 justify-between items-start">
            <div className="flex gap-2">
              <Image src="/assets/logo.svg" alt="Logo" width={40} height={40} />
              <div>
                <h3 className="text-xl font-bold">{` قطعة ${
                  getLicenses![0].license.landNumber
                }`}</h3>
                <p className="text-gray-400">
                  {getLicenses![0].license.district}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Link
          href={`/subscription`}
          className="bg-accent rounded-md p-2 text-black block text-center mt-8"
        >
          احصل على الرخصة
        </Link>
      </div>
    );
  }

  if (!isSubscribed)
    return (
      <main className="bg-[hsla(44,98%,43%,10%)] text-center rounded-2xl max-w-7xl mx-auto my-4 min-h-[550px] flex flex-col items-center justify-center gap-5 p-10 border border-black">
        <h3 className="text-3xl font-bold text-black max-w-[550px]">
          احصل على رخصة مرقب كي تستطيع ان تتطلع على آخر مستجدات اراضيك وتصنيفها
        </h3>
        <Link href="/subscription" className="block rounded-full">
          <Button className="bg-[#121E36] rounded-full text-[#FFDD47] font-bold px-28 text-3xl py-10 cursor-pointer">
            <span className="text-shadow-lg text-shadow-[#863434]">
              احصل عليها الآن!
            </span>
          </Button>
        </Link>
      </main>
    );

  return children;
};

export default OnlySubscribed;
