// src/components/shared/UserLookup.jsx
import { useEffect, useState, useRef } from "react";
import { useDebounce } from "use-debounce";
import supabase from "../../services/supabase";
import { useAuth } from "../authentication/AuthProvider";
import styles from "./UserLookup.module.css";

function UserLookup({ value, onChange, name }) {
   const { user } = useAuth();
   const [searchTerm, setSearchTerm] = useState("");
   const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
   const [options, setOptions] = useState([]);
   const [selectedUser, setSelectedUser] = useState(null);
   const [showDropdown, setShowDropdown] = useState(false);
   const [highlightedIndex, setHighlightedIndex] = useState(-1);

   const inputRef = useRef();
   let placeholder = "Search users...";

   useEffect(() => {
      if (!value && user) {
         onChange(user.custom_id);
         setSelectedUser({ name: user.email, custom_id: user.custom_id });
      }
   }, [value, user, onChange]);

   useEffect(() => {
      async function fetchUsers() {
         if (!debouncedSearchTerm || debouncedSearchTerm.length < 3) return;
         const { data, error } = await supabase
            .from("users")
            .select("custom_id, name")
            .ilike("firstname", `%${debouncedSearchTerm}%`);
         if (!error) {
            setOptions(data);
            setShowDropdown(true);
            setHighlightedIndex(-1);
         } else {
            console.error("User search error:", error.message);
         }
      }
      fetchUsers();
   }, [debouncedSearchTerm]);

   const handleSelect = (user) => {
      setSelectedUser(user);
      onChange(user.custom_id);
      setShowDropdown(false);
      setSearchTerm("");
   };

   // const handleClear = () => {
   //    setSelectedUser(null);
   //    onChange("");
   //    setSearchTerm("");
   //    setShowDropdown(false);
   //    setOptions([]);
   //    setHighlightedIndex(-1);
   //    inputRef.current?.focus();
   // };

   const handleClear = () => {
      setSelectedUser(null);
      onChange("");
      setSearchTerm("");
      setOptions([]);
      setHighlightedIndex(-1);
      inputRef.current?.focus(); // Bring cursor back immediately
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
               // onFocus={() => setShowDropdown(true)}
               onFocus={() => {
                  if (!selectedUser) setShowDropdown(true);
               }}
               onKeyDown={handleKeyDown}
               className={styles.input}
               name={name}
               autoComplete="off"
               // disabled={!!selectedUser}
            />

            {selectedUser && (
               <div className={styles.selectedDisplay}>
                  <span>{selectedUser.name}</span>
                  <button
                     type="button"
                     className={styles.clearBtn}
                     onClick={handleClear}
                  >
                     &times;
                  </button>
               </div>
            )}
         </div>

         {showDropdown && options.length > 0 && (
            <ul className={styles.dropdown}>
               {options.map((user, idx) => (
                  <li
                     key={user.custom_id}
                     onClick={() => handleSelect(user)}
                     className={
                        idx === highlightedIndex ? styles.highlighted : ""
                     }
                  >
                     {user.name}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}

export default UserLookup;
