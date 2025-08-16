import SubscriptionForm from "@/components/forms/SubscriptionForm";
import ArrowBack from "@/components/shared/ArrowBack";
import NotSignup from "@/components/shared/NotSignup";
import { getCurrentUser } from "@/lib/actions/authActions";
import { getInActiveSubscriptions } from "@/lib/actions/subscriptionActions";
import React from "react";

const page = async () => {
  const user = await getCurrentUser();

  if (!user) return <NotSignup />;

  const notActiveLicenses = await getInActiveSubscriptions(user.id);
  console.log(notActiveLicenses);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[calc(100vh-4rem-334px)]">
      <ArrowBack className="mr-auto" />
      <SubscriptionForm userId={user.id} licenses={notActiveLicenses} />
    </div>
  );
};

export default page;
