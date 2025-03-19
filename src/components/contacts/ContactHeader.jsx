import React, { useState } from "react";
import SharedModal from "../Shared/SharedModal";
import ContactForm from "./ContactForm";
import styles from "./ContactHeader.module.css";

function ContactHeader({ onSearch, onFilterChange, count, sortBy, order }) {
   const [filter, setFilter] = useState("all");
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleFilterChange = (e) => {
      setFilter(e.target.value);
      onFilterChange(e.target.value); // Pass selected filter to parent component
   };

   const formattedOrder = order === "asc" ? "Ascending" : "Descending";

   const sortByLabels = {
      name: "Name",
      phone1: "Phone",
      email: "Email",
   };

   const formattedSortBy = sortByLabels[sortBy] || "Name";

   return (
      <div className={styles.contactHeader}>
         <div>
            <select name="contacts" id="contact-select">
               <option value="all">All Contacts</option>
            </select>
            <h4>
               {count} Contacts - Sorted by {formattedSortBy}, {formattedOrder}
            </h4>
         </div>

         <div>
            <input
               type="text"
               placeholder="Search contacts..."
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
               className={styles.newContactButton}
               onClick={() => setIsModalOpen(true)}
            >
               + New Contact
            </button>
         </div>
         {/* Render ContactForm inside SharedModal when isModalOpen is true */}
         {isModalOpen && (
            <SharedModal
               isOpen={isModalOpen}
               onClose={() => setIsModalOpen(false)}
            >
               <ContactForm onClose={() => setIsModalOpen(false)} />
            </SharedModal>
         )}
      </div>
   );
}

export default ContactHeader;
