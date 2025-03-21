import React, { useState } from "react";
import SharedModal from "../Shared/SharedModal";
import TaskForm from "./TaskForm";
import styles from "./TaskHeader.module.css";

function TaskHeader({ onSearch, onFilterChange, count, sortBy, order }) {
   const [filter, setFilter] = useState("all");
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleFilterChange = (e) => {
      setFilter(e.target.value);
      onFilterChange(e.target.value); // Pass selected filter to parent component
   };

   const formattedOrder = order === "asc" ? "Ascending" : "Descending";

   const sortByLabels = {
      name: "Subject",
      who_id: "Name",
      what_id: "Related To",
      due_date: "Due Date",
      status: "Status",
      priority: "Priority",
   };

   const formattedSortBy = sortByLabels[sortBy] || "Name";

   return (
      <div className={styles.taskHeader}>
         <div>
            <select name="tasks" id="task-select">
               <option value="open">Open Tasks</option>
               <option value="overdue">Overdue Tasks</option>
               <option value="completed">Completed Tasks</option>
               <option value="todays">Todays Tasks</option>
               <option value="unscheduled">Unscheduled Tasks</option>
            </select>
            <h4>
               {count} Tasks - Sorted by {formattedSortBy}, {formattedOrder}
            </h4>
         </div>

         <div>
            <input
               type="text"
               placeholder="Search tasks..."
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
               className={styles.newTaskButton}
               onClick={() => setIsModalOpen(true)}
            >
               + New Task
            </button>
         </div>
         {/* Render TaskForm inside SharedModal when isModalOpen is true */}
         {isModalOpen && (
            <SharedModal
               isOpen={isModalOpen}
               onClose={() => setIsModalOpen(false)}
            >
               <TaskForm onClose={() => setIsModalOpen(false)} />
            </SharedModal>
         )}
      </div>
   );
}

export default TaskHeader;
