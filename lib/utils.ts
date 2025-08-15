import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFirstName = (fullName: string) => {
  const names = fullName.split(" ");
  return names[0];
};

export const formatDate = (date: Date) => {
  const day = date.getDay();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getRemainingDays = (startDate: Date, endDate: Date) => {
  const difference = endDate.getTime() - startDate.getTime();
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  return days;
};
