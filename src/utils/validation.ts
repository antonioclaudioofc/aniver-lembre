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
