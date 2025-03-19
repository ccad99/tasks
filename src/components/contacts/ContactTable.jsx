import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SharedModal from "../Shared/SharedModal";
import ContactForm from "./ContactForm";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import { HiArrowLongUp } from "react-icons/hi2";
import { HiArrowLongDown } from "react-icons/hi2";
import styles from "./ContactTable.module.css";

const ContactTable = ({ contacts, sortBy, order, handleSort }) => {
   const [menuOpenRow, setMenuOpenRow] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedContact, setSelectedContact] = useState(null);

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
   const handleEdit = (contact) => {
      setSelectedContact(contact);
      setIsModalOpen(true);
      setMenuOpenRow(null); //close the row menu
   };

   const columns = [
      {
         Header: "Name",
         accessor: "name",
         sortable: true,
         Cell: ({ row }) => (
            <Link
               to={`/contacts/${row.original.custom_id}`}
               className="contactLink"
            >
               {row.original.name}
            </Link>
         ),
      },
      {
         Header: "Phone",
         accessor: "phone1",
         sortable: true,
      },
      {
         Header: "Email",
         accessor: "email",
         sortable: true,
      },
   ];

   return (
      <>
         <div className={styles.contactTableContainer}>
            <table className={styles.contactTable}>
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
                  {contacts.map((contact, idx) => (
                     <tr key={contact.custom_id}>
                        <td>{idx + 1}</td>
                        {columns.map((col) => (
                           <td key={col.accessor}>
                              {col.Cell
                                 ? col.Cell({ row: { original: contact } })
                                 : contact[col.accessor]}
                           </td>
                        ))}
                        <td className={styles.rowMenu}>
                           <button
                              className={styles.menuBtn}
                              onClick={() =>
                                 handleMenuToggle(contact.custom_id)
                              }
                           >
                              <FaAngleDown />
                           </button>
                           {menuOpenRow === contact.custom_id && (
                              <div className={styles.menuDropDown}>
                                 <button onClick={() => handleEdit(contact)}>
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
               <ContactForm
                  contact={selectedContact}
                  onClose={() => setIsModalOpen(false)}
               />
            </SharedModal>
         )}
      </>
   );
};

export default ContactTable;
