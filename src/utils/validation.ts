import dayjs from "dayjs";

export function isValidData(date: string): boolean {
  const today = dayjs(new Date());
  const maxDate = today.add(3000, "year");

  if (
    dayjs(date).isBefore(dayjs("1900-01-01")) ||
    dayjs(date).isAfter(maxDate)
  ) {
    return false;
  }
  return true;
}

export function isValidBirthData(date: string): boolean {
  if (
    dayjs(date).isBefore(dayjs("1900-01-01")) ||
    dayjs(date).isAfter(dayjs(new Date())) 
  ) {
    return false;
  }
  return true;
}