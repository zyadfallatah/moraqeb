import Logout from "@/components/forms/Logout";
import { getUserById } from "@/lib/actions/authActions";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  console.log(id);
  const user = await getUserById(id);
  return (
    <div>
      <Logout />
      User: {user?.name}
    </div>
  );
};

export default page;
