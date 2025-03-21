import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SharedModal from "../Shared/SharedModal";
import TaskForm from "./TaskForm";
import { FaAngleDown } from "react-icons/fa6";
import { HiArrowLongUp } from "react-icons/hi2";
import { HiArrowLongDown } from "react-icons/hi2";
import styles from "./TaskTable.module.css";

const TaskTable = ({ tasks, sortBy, order, handleSort }) => {
   const [menuOpenRow, setMenuOpenRow] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedTask, setSelectedTask] = useState(null);

   // close row menu when clicking outside
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (
            !event.target.closest(`.${styles.rowMenu}`) &&
            !event.target.closest(`.${styles.menuBtn}`)
         ) {
            setMenuOpenRow(null);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
         document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   const handleMenuToggle = (custom_id) => {
      setMenuOpenRow((prevRow) => (prevRow === custom_id ? null : custom_id));
   };
   const handleEdit = (task) => {
      setSelectedAccount(task);
      setIsModalOpen(true);
      setMenuOpenRow(null); //close the row menu
   };

   const columns = [
      {
         Header: "Subject",
         accessor: "subject",
         sortable: true,
         Cell: ({ row }) => (
            <Link to={`/tasks/${row.original.custom_id}`} className="taskLink">
               {row.original.subject}
            </Link>
         ),
      },
      {
         Header: "Name",
         accessor: "who_id",
         sortable: true,
      },
      {
         Header: "Related To",
         accessor: "what_id",
         sortable: true,
      },
      {
         Header: "Due Date",
         accessor: "due_date",
         sortable: true,
      },
      {
         Header: "Status",
         accessor: "status",
         sortable: true,
      },
      {
         Header: "Priority",
         accessor: "priority",
         sortable: true,
      },
   ];

   return (
      <>
         <div className={styles.taskTableContainer}>
            <table className={styles.taskTable}>
               <thead>
                  <tr>
                     <th>#</th>
                     {columns.map((col) => (
                        <th
                           key={col.accessor}
                           className={col.sortable ? styles.sortable : ""}
                           onClick={() =>
                              col.sortable && handleSort(col.accessor)
                           }
                        >
                           {col.Header}
                           {col.sortable && (
                              <span className={styles.sortIcon}>
                                 {sortBy === col.accessor &&
                                    (order === "asc" ? (
                                       <HiArrowLongUp />
                                    ) : (
                                       <HiArrowLongDown />
                                    ))}
                              </span>
                           )}
                        </th>
                     ))}
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {tasks.map((task, idx) => (
                     <tr key={task.custom_id}>
                        <td>{idx + 1}</td>
                        {columns.map((col) => (
                           <td key={col.accessor}>
                              {col.Cell
                                 ? col.Cell({ row: { original: task } })
                                 : task[col.accessor]}
                           </td>
                        ))}
                        <td className={styles.rowMenu}>
                           <button
                              className={styles.menuBtn}
                              onClick={() => handleMenuToggle(task.custom_id)}
                           >
                              <FaAngleDown />
                           </button>
                           {menuOpenRow === task.custom_id && (
                              <div className={styles.menuDropDown}>
                                 <button onClick={() => handleEdit(task)}>
                                    Edit
                                 </button>
                                 <button className={styles.deleteButton}>
                                    Delete
                                 </button>
                              </div>
                           )}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         {isModalOpen && (
            <SharedModal
               isOpen={isModalOpen}
               onClose={() => setIsModalOpen(false)}
            >
               <TaskForm
                  task={selectedTask}
                  onClose={() => setIsModalOpen(false)}
               />
            </SharedModal>
         )}
      </>
   );
};

export default TaskTable;
