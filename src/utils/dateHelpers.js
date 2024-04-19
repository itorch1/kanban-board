import { differenceInDays, parseISO } from "date-fns";

export function subtractDays(dateStr1, dateStr2) {
  return differenceInDays(
    parseISO(String(dateStr1)),
    parseISO(String(dateStr2))
  );
}
