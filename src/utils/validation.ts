/* eslint-disable   @typescript-eslint/no-explicit-any */

import dayjs from "dayjs";

export function isValidBirthData(date: string): boolean {
  if (
    dayjs(date).isAfter(dayjs(new Date())) ||
    dayjs(date).isBefore(dayjs("1900-01-01"))
  ) {
    return false;
  }
  return true;
}

export function formatDateToBR(date: any): string {
  let d: Date;

  if (typeof date === "string") {
    d = new Date(date);
  } else if (date?._seconds) {
    d = new Date(date._seconds * 1000);
  } else {
    return "";
  }

  const day = String(d.getDate() + 1).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatDateToInput(date: any): string {
  let d: Date;

  if (typeof date === "string") {
    d = new Date(date);
  } else if (date instanceof Date) {
    d = date;
  } else if (typeof date === "object" && "_seconds" in date) {
    d = new Date(date._seconds * 1000);
  } else {
    return "";
  }

  return d.toISOString().split("T")[0];
}

export function calculateAge(date: any): number {
  let birth: Date;

  if (typeof date === "string") {
    birth = new Date(date);
  } else if (date?._seconds) {
    birth = new Date(date._seconds * 1000);
  } else {
    return 0;
  }

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age + 1;
}
