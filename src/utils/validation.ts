import dayjs from "dayjs";

export function isValidData(date: string): boolean {
  const today = dayjs(new Date());
  const maxDate = today.add(3000, "year");

  if (
    dayjs(date).isAfter(maxDate) ||
    dayjs(date).isBefore(dayjs("1900-01-01"))
  ) {
    return false;
  }
  return true;
}
