import React from "react";

interface Props {
  title: string;
  leaseNumber: string;
}

const ProfileLease = ({ title, leaseNumber }: Props) => {
  return (
    <div className="border border-[#D2D6DB] p-4 rounded-2xl">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-xl font-normal text-gray-400">{leaseNumber}</p>
    </div>
  );
};

export default ProfileLease;
