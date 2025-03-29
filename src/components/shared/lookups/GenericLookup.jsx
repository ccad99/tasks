// src/components/shared/GenericLookup.jsx
import { useEffect, useState, useRef } from "react";
import { useDebounce } from "use-debounce";
import supabase from "../../../services/supabase";
import styles from "./GenericLookup.module.css";

function GenericLookup({
   value,
   onChange,
   name,
   table,
   labelField,
   valueField,
   placeholder = "Search...",
   defaultValue = null,
   filter = "", // optional future filter
   isClearable = true, // <-- NEW feature
}) {
   const [searchTerm, setSearchTerm] = useState("");
   const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
   const [options, setOptions] = useState([]);
   const [selected, setSelected] = useState(null);
   const [showDropdown, setShowDropdown] = useState(false);
   const [highlightedIndex, setHighlightedIndex] = useState(-1);

   const inputRef = useRef();

   // Load default value
   useEffect(() => {
      if (!value && defaultValue) {
         onChange(defaultValue[valueField]);
         setSelected(defaultValue);
      }
   }, [value, defaultValue, valueField, onChange]);

   // Fetch options
   useEffect(() => {
      async function fetchOptions() {
         if (!debouncedSearchTerm || debouncedSearchTerm.length < 3) return;

         const { data, error } = await supabase
            .from(table)
            .select(`${valueField}, ${labelField}`)
            .ilike(labelField, `%${debouncedSearchTerm}%`)
            .order(labelField, { ascending: true });

         if (!error) {
            setOptions(data);
            setShowDropdown(true);
            setHighlightedIndex(-1);
         } else {
            console.error("Lookup fetch error:", error.message);
         }
      }

      fetchOptions();
   }, [debouncedSearchTerm, table, labelField, valueField]);

   const handleSelect = (item) => {
      setSelected(item);
      onChange(item[valueField]);
      setShowDropdown(false);
      setSearchTerm("");
   };

   const handleClear = () => {
      setSelected(null);
      onChange("");
      setSearchTerm("");
      setShowDropdown(false);
      setOptions([]);
      setHighlightedIndex(-1);
      inputRef.current?.focus();
   };

   const handleKeyDown = (e) => {
      if (!showDropdown) return;

      if (e.key === "ArrowDown") {
         e.preventDefault();
         setHighlightedIndex((prev) => Math.min(prev + 1, options.length - 1));
      } else if (e.key === "ArrowUp") {
         e.preventDefault();
         setHighlightedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && highlightedIndex >= 0) {
         e.preventDefault();
         handleSelect(options[highlightedIndex]);
      } else if (e.key === "Escape") {
         e.preventDefault();
         setShowDropdown(false);
      }
   };

   return (
      <div className={styles.lookupWrapper}>
         <div className={styles.inputContainer}>
            <input
               ref={inputRef}
               type="text"
               placeholder={placeholder}
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               onFocus={() => setShowDropdown(true)}
               onKeyDown={handleKeyDown}
               className={styles.input}
               name={name}
               autoComplete="off"
               disabled={!!selected}
            />

            {selected && (
               <div className={styles.selectedDisplay}>
                  <span>{selected[labelField]}</span>
                  {isClearable && (
                     <button
                        type="button"
                        className={styles.clearBtn}
                        onClick={handleClear}
                     >
                        &times;
                     </button>
                  )}
               </div>
            )}
         </div>

         {showDropdown && options.length > 0 && (
            <ul className={`${styles.dropdown} ${styles.fadeIn}`}>
               {options.map((item, idx) => (
                  <li
                     key={item[valueField]}
                     onClick={() => handleSelect(item)}
                     className={
                        idx === highlightedIndex ? styles.highlighted : ""
                     }
                  >
                     {item[labelField]}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}

export default GenericLookup;
