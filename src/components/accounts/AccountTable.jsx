import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import AccountModal from "./AccountModal";
import SharedModal from "../Shared/SharedModal";
import AccountForm from "./AccountForm";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { HiArrowLongUp } from "react-icons/hi2";
import { HiArrowLongDown } from "react-icons/hi2";
import styles from "./AccountTable.module.css";

const AccountTable = ({ accounts, sortBy, order, handleSort }) => {
   const [menuOpenRow, setMenuOpenRow] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedAccount, setSelectedAccount] = useState(null);

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
   const handleEdit = (account) => {
      setSelectedAccount(account);
      setIsModalOpen(true);
      setMenuOpenRow(null); //close the row menu
   };

   const columns = [
      {
         Header: "Account Name",
         accessor: "name",
         sortable: true,
         Cell: ({ row }) => (
            <Link
               to={`/accounts/${row.original.custom_id}`}
               className="accountLink"
            >
               {row.original.name}
            </Link>
         ),
      },
      {
         Header: "Industry",
         accessor: "industry",
         sortable: true,
      },
      {
         Header: "Phone",
         accessor: "phone1",
         sortable: true,
      },
   ];

   //Sorting function  --- only for client-side sorting

   // const sortedAccounts = [...accounts].sort((a, b) => {
   //    const valA = a[sortColumn] || "";
   //    const valB = b[sortColumn] || "";

   //    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
   //    if (valA > valB) return sortOrder === "desc" ? 1 : -1;
   //    return 0;
   // });

   // Handle sorting   --- only for client-side sorting

   // const handleSort = (column) => {
   //    // console.log("in handleSort");
   //    // console.log(
   //    //    `column: ${column} and sortColumn: ${sortColumn} and sortOrder: ${sortOrder} `
   //    // );
   //    if (column === sortColumn) {
   //       setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
   //    } else {
   //       setSortColumn(column);
   //       setSortOrder("asc");
   //    }
   // };

   return (
      <>
         <div className={styles.acctTableContainer}>
            <table className={styles.acctTable}>
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
                  {accounts.map((account, idx) => (
                     <tr key={account.custom_id}>
                        <td>{idx + 1}</td>
                        {columns.map((col) => (
                           <td key={col.accessor}>
                              {col.Cell
                                 ? col.Cell({ row: { original: account } })
                                 : account[col.accessor]}
                           </td>
                        ))}
                        <td className={styles.rowMenu}>
                           <button
                              className={styles.menuBtn}
                              onClick={() =>
                                 handleMenuToggle(account.custom_id)
                              }
                           >
                              <FaAngleDown />
                           </button>
                           {menuOpenRow === account.custom_id && (
                              <div className={styles.menuDropDown}>
                                 <button onClick={() => handleEdit(account)}>
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
               <AccountForm
                  account={selectedAccount}
                  onClose={() => setIsModalOpen(false)}
               />
            </SharedModal>
         )}
      </>
   );
};

export default AccountTable;
