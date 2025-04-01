// src/utils/formatDateInput.js

/**
 * formatDateInput
 * Turns raw user input into MM-DD-YYYY formatted string
 * Pads single digit months/days and expands 2-digit years
 */
export function formatDateInput(rawInput) {
   // let input = rawInput.replace(/\D/g, "").slice(0, 8); // digits only, max 8

   // Allow both "-" and "/" as separators
   const input = rawInput.replace(/[^0-9\/\.\-]/g, ""); // only digits, slashes, periods, & hyphens

   let mm = input.slice(0, 2);
   let dd = input.slice(2, 4);
   let yyyy = input.slice(4, 8);

   // Pad single digit month/day if needed

   console.log(rawInput);
   console.log(rawInput.slice(-1));

   if (
      rawInput.slice(-1) === "/" ||
      rawInput.slice(-1) === "-" ||
      rawInput.slice(-1) === "."
   ) {
      if (mm.length === 2) mm = "0" + mm;
   }

   if (
      rawInput.slice(-1) === "/" ||
      rawInput.slice(-1) === "-" ||
      rawInput.slice(-1) === "."
   ) {
      if (dd.length === 2) dd = "0" + dd;
   }

   // Soft limit months and days
   if (mm.length === 2 && parseInt(mm) < 1) mm = "01";
   if (mm.length === 2 && parseInt(mm) > 12) mm = "12";

   if (dd.length === 2 && parseInt(dd) < 1) dd = "01";
   if (dd.length === 2 && parseInt(dd) > 31) dd = "31";

   // Expand 2-digit year into 20XX
   if (yyyy.length === 2) yyyy = "20" + yyyy;

   // Progressive formatting
   // if (input.length <= 2) return mm;
   // if (input.length <= 4) return `${mm}-${dd}`;
   // return `${mm}-${dd}-${yyyy}`;

   const cleanDate = input.replace(/[^0-9]/g, "");
   console.log(cleanDate);
   let formatted = "";
   if (input.length <= 2) formatted = mm;
   else if (input.length <= 4) formatted = `${mm}-${dd}`;
   else formatted = `${mm}-${dd}-${yyyy}`;

   return formatted;
}
