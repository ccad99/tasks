// src/pages/ObjectiveTable.jsx

import { useState } from "react";
import SharedModal from "../Shared/SharedModal";
import ObjectiveForm from "./ObjectiveForm";
import { FaAngleDown } from "react-icons/fa6";
import { HiArrowLongUp, HiArrowLongDown } from "react-icons/hi2";
import { useTableData } from "../../hooks/useTableData";
import styles from "./ObjectiveTable.module.css";

function ObjectiveTable() {
   const [menuOpenRow, setMenuOpenRow] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedObjective, setSelectedObjective] = useState(null);

   const {
      data: objectives = [],
      sortBy,
      order,
      handleSort,
   } = useTableData("objective");

   const columns = [
      { Header: "Objective", accessor: "name", sortable: true },
      { Header: "Owner", accessor: "owner_id", sortable: true },
      { Header: "Start Date", accessor: "start_date", sortable: true },
      { Header: "Due Date", accessor: "due_date", sortable: true },
      { Header: "Status", accessor: "status", sortable: true },
      { Header: "Priority", accessor: "priority", sortable: true },
      { Header: "% Complete", accessor: "percent_complete", sortable: true },
   ];

   const handleMenuToggle = (custom_id) => {
      setMenuOpenRow((prevRow) => (prevRow === custom_id ? null : custom_id));
   };

   const handleEdit = (objective) => {
      setSelectedObjective(objective);
      setIsModalOpen(true);
      setMenuOpenRow(null);
   };

   return (
      <>
         <div className={styles.objectiveTableContainer}>
            <table className={styles.objectiveTable}>
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
                  {objectives.map((obj, idx) => (
                     <tr key={obj.custom_id}>
                        <td>{idx + 1}</td>
                        {columns.map((col) => (
                           <td key={col.accessor}>{obj[col.accessor]}</td>
                        ))}
                        <td className={styles.rowMenu}>
                           <button
                              className={styles.menuBtn}
                              onClick={() => handleMenuToggle(obj.custom_id)}
                           >
                              <FaAngleDown />
                           </button>
                           {menuOpenRow === obj.custom_id && (
                              <div className={styles.menuDropDown}>
                                 <button onClick={() => handleEdit(obj)}>
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
               <ObjectiveForm
                  objective={selectedObjective}
                  onClose={() => setIsModalOpen(false)}
               />
            </SharedModal>
         )}
      </>
   );
}

export default ObjectiveTable;
