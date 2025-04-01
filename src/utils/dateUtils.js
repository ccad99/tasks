import { parse, isValid, format } from "date-fns";

export function parseIsoDate(value) {
   return parse(value, "yyyy-MM-dd", new Date());
}

export function parseDisplayDate(value) {
   return parse(value, "MM-dd-yyyy", new Date());
}

export function isValidIsoDate(value) {
   return isValid(parseIsoDate(value));
}

export function isValidDisplayDate(value) {
   return isValid(parseDisplayDate(value));
}

export function toIsoDate(value) {
   const parsed = parseDisplayDate(value);
   return isValid(parsed) ? format(parsed, "yyyy-MM-dd") : "";
}

export function toDisplayDate(value) {
   const parsed = parseIsoDate(value);
   return isValid(parsed) ? format(parsed, "MM-dd-yyyy") : "";
}
