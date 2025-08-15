import { ReactNode } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { getCurrentUser } from "@/lib/actions/authActions";
import NotSignup from "./NotSignup";
import { isSubscriptionValid } from "@/lib/actions/subscriptionActions";
import { getUserLeases } from "@/lib/actions/leaseActions";

const OnlySubscribed = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();

  if (!user) return <NotSignup />;
  const lease = await getUserLeases(user.id);
  const isSubscribed = await isSubscriptionValid(lease[0].licenseNumber);

  if (!isSubscribed)
    return (
      <main className="bg-[hsla(44,98%,43%,10%)] text-center rounded-2xl max-w-7xl mx-auto my-4 min-h-[550px] flex flex-col items-center justify-center gap-5 p-10 border border-black">
        <h3 className="text-3xl font-bold text-black max-w-[550px]">
          احصل على رخصة مرقب كي تستطيع ان تتطلع على آخر مستجدات اراضيك وتصنيفها
        </h3>
        <Link href="#" className="block rounded-full">
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
