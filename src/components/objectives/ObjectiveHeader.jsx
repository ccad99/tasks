import React, { useState } from "react";
import SharedModal from "../Shared/SharedModal";
import ObjectiveForm from "./ObjectiveForm";
import styles from "./ObjectiveHeader.module.css";

function ObjectiveHeader({ onSearch, onFilterChange, count, sortBy, order }) {
   const [filter, setFilter] = useState("all");
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleFilterChange = (e) => {
      setFilter(e.target.value);
      onFilterChange(e.target.value); // Pass selected filter to parent component
   };

   const formattedOrder = order === "asc" ? "Ascending" : "Descending";

   const sortByLabels = {
      name: "Title",
      owner_id: "Owner",
      start_date: "Start Date",
      due_date: "Due Date",
      status: "Status",
      priority: "Priority",
      percent_complete: "% Complete",
   };

   const formattedSortBy = sortByLabels[sortBy] || "Name";

   return (
      <div className={styles.objectiveHeader}>
         <div>
            <select name="objectives" id="objective-select">
               <option value="open">Open Objectives</option>
               <option value="overdue">Overdue Objectives</option>
               <option value="completed">Completed Objectives</option>
               <option value="todays">Todays Objectives</option>
               <option value="unscheduled">Unscheduled Objectives</option>
            </select>
            <h4>
               {count} Objectives - Sorted by {formattedSortBy},{" "}
               {formattedOrder}
            </h4>
         </div>

         <div>
            <input
               type="text"
               placeholder="Search objectives..."
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
               <option value="all">All Objectives</option>
               <option value="open">Open Objectives</option>
               <option value="completed">Completed Objectives</option>
            </select> */}
            <button
               className={styles.newObjectiveButton}
               onClick={() => setIsModalOpen(true)}
            >
               + New Objective
            </button>
         </div>
         {/* Render ObjectiveForm inside SharedModal when isModalOpen is true */}
         {isModalOpen && (
            <SharedModal
               isOpen={isModalOpen}
               onClose={() => setIsModalOpen(false)}
            >
               <ObjectiveForm onClose={() => setIsModalOpen(false)} />
            </SharedModal>
         )}
      </div>
   );
}

export default ObjectiveHeader;
