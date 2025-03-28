// src/components/shared/UserLookup.jsx
import { useEffect, useState } from "react";
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

   // Load default user when mounted (if no value provided)
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
   };

   const handleClear = () => {
      setSelectedUser(null);
      onChange("");
      setSearchTerm("");
      setShowDropdown(true);
      setTimeout(() => {
         const input = document.querySelector(`input[name="${name}"]`);
         if (input) input.focus();
      }, 0);
   };

   return (
      <div className={styles.lookupWrapper}>
         {selectedUser ? (
            <div className={styles.selectedDisplay}>
               <span>{selectedUser.name}</span>
               <button className={styles.clearBtn} onClick={handleClear}>
                  &times;
               </button>
            </div>
         ) : (
            <input
               type="text"
               placeholder="Search users..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               onFocus={() => setShowDropdown(true)}
               className={styles.input}
               name={name}
               autoComplete="off"
            />
         )}
         {showDropdown && options.length > 0 && (
            <ul className={styles.dropdown}>
               {options.map((user) => (
                  <li key={user.custom_id} onClick={() => handleSelect(user)}>
                     {user.name}
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
}

export default UserLookup;
