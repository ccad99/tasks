import { useRef, useState } from "react";
import styles from "./DateInput.module.css";
import { format } from "date-fns";
import {
   isValidIsoDate,
   toDisplayDate,
   toIsoDate,
} from "../../../utils/dateUtils";
import { formatDateInput } from "../../../utils/formatDateInput";

function DateInput({ value, onChange, name, error }) {
   const inputRef = useRef(null);
   const dateInputRef = useRef(null);
   const [calendarOpen, setCalendarOpen] = useState(false);
   const [inputValue, setInputValue] = useState("");

   const openCalendar = () => {
      setCalendarOpen(true);
      dateInputRef.current?.showPicker();
   };

   const closeCalendar = () => {
      setCalendarOpen(false);
   };

   const handleIconClick = (e) => {
      e.preventDefault();
      if (calendarOpen) closeCalendar();
      else openCalendar();
   };

   const handleInputClick = () => {
      if (calendarOpen) closeCalendar();
   };

   // =============== DateInput.js (fragment) ===============

   // const handleTextChange = (e) => {
   //    let input = e.target.value.replace(/\D/g, ""); // Keep only digits
   //    if (input.length > 8) input = input.slice(0, 8); // Limit length

   //    let mm = input.slice(0, 2);
   //    let dd = input.slice(2, 4);
   //    let yyyy = input.slice(4, 8);

   //    // Zero-pad if needed
   //    if (mm.length === 1 && mm !== "0") mm = "0" + mm;
   //    if (dd.length === 1 && dd !== "0") dd = "0" + dd;
   //    if (yyyy.length === 2) yyyy = "20" + yyyy;

   //    // Soft limits
   //    if (parseInt(mm) > 12) mm = "12";
   //    if (parseInt(dd) > 31) dd = "31";

   //    // Progressive formatting
   //    let formatted = "";
   //    if (input.length <= 2) formatted = mm.slice(0, 2);
   //    else if (input.length <= 4) formatted = `${mm}-${dd.slice(0, 2)}`;
   //    else formatted = `${mm}-${dd}-${yyyy}`;

   //    setInputValue(formatted);
   //    onChange(toIsoDate(formatted));
   // };

   const handleTextChange = (e) => {
      const formatted = formatDateInput(e.target.value);
      setInputValue(formatted);
      onChange(toIsoDate(formatted));
   };

   const handleKeyDown = (e) => {
      // Smart Backspace: remove "-" naturally
      if (e.key === "Backspace") {
         const pos = e.target.selectionStart;
         if (pos && e.target.value[pos - 1] === "-") {
            e.preventDefault();
            const newValue =
               e.target.value.slice(0, pos - 1) + e.target.value.slice(pos);
            e.target.value = newValue;
            onChange(toIsoDate(newValue));
         }
      }
      if (e.key === "Escape" && calendarOpen) {
         e.preventDefault();
         closeCalendar();
      }
   };

   // const handleBlur = () => {
   //    if (!value) return;

   //    // Auto-complete if year is only 2 digits
   //    const parts = value.split("-");
   //    if (parts.length === 3 && parts[2].length === 2) {
   //       const completed = `${parts[0]}-${parts[1]}-20${parts[2]}`;
   //       onChange(toIsoDate(completed));
   //    } else if (!isValidIsoDate(value)) {
   //       onChange(""); // fallback clear
   //    }
   // };

   const handleBlur = () => {
      if (!inputValue) return;
      const formatted = formatDateInput(inputValue);
      setInputValue(formatted);
      onChange(toIsoDate(formatted));
   };

   const handleDateChange = (e) => {
      onChange(e.target.value);
      setInputValue(toDisplayDate(e.target.value));
      closeCalendar();
   };

   const handleToday = () => {
      const today = format(new Date(), "yyyy-MM-dd");
      onChange(today);
      setInputValue(toDisplayDate(today));
      inputRef.current?.focus();
      closeCalendar();
   };

   return (
      <div className={styles.inputWrapper}>
         <input
            ref={inputRef}
            type="text"
            name={name}
            value={inputValue}
            onChange={handleTextChange}
            onBlur={handleBlur}
            onClick={handleInputClick}
            onKeyDown={handleKeyDown}
            placeholder="MM-DD-YYYY"
            aria-haspopup="dialog"
            aria-expanded={calendarOpen}
            aria-controls={`${name}-calendar`}
            className={`${styles.input} ${
               error || (value && !isValidIsoDate(value))
                  ? styles.inputError
                  : ""
            }`}
            autoComplete="off"
         />

         <input
            ref={dateInputRef}
            id={`${name}-calendar`}
            type="date"
            value={value || ""}
            onChange={handleDateChange}
            className={styles.hiddenDateInput}
            tabIndex={-1}
         />

         <button
            type="button"
            onClick={handleIconClick}
            className={styles.iconBtn}
            title="Open calendar"
            aria-label="Open calendar"
         >
            📅
         </button>

         <button
            type="button"
            onClick={handleToday}
            className={styles.todayBtn}
            aria-label="Set date to today"
         >
            Today
         </button>

         {error && <p className={styles.errorText}>{error}</p>}
         {!error && value && !isValidIsoDate(value) && (
            <p className={styles.warningText}>Invalid date</p>
         )}
      </div>
   );
}

export default DateInput;
