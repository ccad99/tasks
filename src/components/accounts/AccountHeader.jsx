import React, { useState } from "react";
import AccountForm from "./AccountForm";
// import AccountModal from "./AccountModal";
import SharedModal from "../Shared/SharedModal";
import styles from "./AccountHeader.module.css";

function AccountHeader({ onSearch, onFilterChange, count, sortBy, order }) {
   const [filter, setFilter] = useState("all");
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleFilterChange = (e) => {
      setFilter(e.target.value);
      onFilterChange(e.target.value); // Pass selected filter to parent component
   };

   const formattedOrder = order === "asc" ? "Ascending" : "Descending";

   const sortByLabels = {
      name: "Name",
      type: "Type",
      city: "City",
      state: "State",
      industry: "Industry",
      phone1: "Phone",
      email: "Email",
   };

   const formattedSortBy = sortByLabels[sortBy] || "Name";

   return (
      <div className={styles.acctHeader}>
         <div>
            <select name="accts" id="acct-select">
               <option value="all">All Accounts</option>
            </select>
            <h4>
               {count} Accounts - Sorted by {formattedSortBy}, {formattedOrder}
            </h4>
         </div>

         <div>
            <input
               type="text"
               placeholder="Search accounts..."
               className={styles.searchBox}
               onChange={(e) => onSearch(e.target.value)}
            />
         </div>

         <div className={styles.controls}>
            {/* <select
               className={styles.filterSelect}
               value={filter}
               onChange={handleFilterChange}
            >
               <option value="all">All Tasks</option>
               <option value="open">Open Tasks</option>
               <option value="completed">Completed Tasks</option>
            </select> */}
            <button
               className={styles.newAcctButton}
               onClick={() => setIsModalOpen(true)}
            >
               + New Account
            </button>
         </div>
         {/* Render AccountForm inside AccountModal when isModalOpen is true */}
         {isModalOpen && (
            <SharedModal
               isOpen={isModalOpen}
               onClose={() => setIsModalOpen(false)}
            >
               <AccountForm onClose={() => setIsModalOpen(false)} />
            </SharedModal>
         )}
      </div>
   );
}

export default AccountHeader;
