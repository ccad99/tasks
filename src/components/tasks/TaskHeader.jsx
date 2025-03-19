import React, { useState } from "react";
import styles from "./TaskHeader.module.css";

function TaskHeader({ onSearch, onFilterChange, taskCount }) {
   const [filter, setFilter] = useState("all");

   const handleFilterChange = (e) => {
      setFilter(e.target.value);
      onFilterChange(e.target.value); // Pass selected filter to parent component
   };

   return (
      <div className={styles.taskHeader}>
         <div>
            <select name="tasks" id="task-select">
               <option value="delegated">Delegated Tasks</option>
               <option value="open">Open Tasks</option>
               <option value="overdue">Overdue Tasks</option>
               <option value="recentlycompleted">Recently Completed</option>
               <option value="recentlyviewed">Recently Viewed</option>
               <option value="recurring">Recurring Tasks</option>
               <option value="todays">Todays Tasks</option>
               <option value="unscheduled">Unscheduled Tasks</option>
            </select>
            <h4>{taskCount} Tasks - Sorted by Due Date</h4>
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
            <button className={styles.newTaskButton}>+ New Task</button>
         </div>
      </div>
   );
}

export default TaskHeader;
