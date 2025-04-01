// src/hooks/useColumns.js
import { HiArrowLongUp, HiArrowLongDown } from "react-icons/hi2";
import { Link } from "react-router-dom";
import styles from "../components/tasks/TaskTable.module.css"; // ✅ reuse same styles

export function useColumns({ sortBy, order, handleSort }) {
   const renderSortIcon = (col) => {
      if (!col.sortable) return null;
      if (sortBy !== col.accessor)
         return <HiArrowLongUp style={{ opacity: 0.2 }} />;
      return order === "asc" ? <HiArrowLongUp /> : <HiArrowLongDown />;
   };

   const getHeaderCell = (col) => (
      <th
         key={col.accessor}
         className={col.sortable ? styles.sortable : ""}
         onClick={() => col.sortable && handleSort(col.accessor)}
      >
         {col.Header}
         <span className={styles.sortIcon}>{renderSortIcon(col)}</span>
      </th>
   );

   const getRowCell = (col, record) => {
      if (col.type === "link") {
         return (
            <td key={col.accessor}>
               <Link
                  to={col.to.replace(":id", record[col.idField])}
                  className="link"
               >
                  {record[col.accessor]}
               </Link>
            </td>
         );
      }
      return <td key={col.accessor}>{record[col.accessor]}</td>;
   };

   return { getHeaderCell, getRowCell };
}
