// src/components/objectives/ObjectiveTable.jsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SharedModal from "../Shared/SharedModal";
import ObjectiveForm from "./ObjectiveForm";
import { FaAngleDown } from "react-icons/fa6";
import { HiArrowLongUp, HiArrowLongDown } from "react-icons/hi2";
import styles from "./ObjectiveTable.module.css";

function ObjectiveTable({ objectives, sortBy, order, handleSort }) {
  const [menuOpenRow, setMenuOpenRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedObj, setSelectedObj] = useState(null);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuToggle = (custom_id) => {
    setMenuOpenRow((prevRow) => (prevRow === custom_id ? null : custom_id));
  };

  const handleEdit = (obj) => {
    setSelectedObj(obj);
    setIsModalOpen(true);
    setMenuOpenRow(null);
  };

  //   const columns = [
  //     { Header: "Objective", accessor: "name", sortable: true },
  //     { Header: "Owner", accessor: "owner_id", sortable: true },
  //     { Header: "Start Date", accessor: "start_date", sortable: true },
  //     { Header: "Due Date", accessor: "due_date", sortable: true },
  //     { Header: "Status", accessor: "status", sortable: true },
  //     { Header: "Priority", accessor: "priority", sortable: true },
  //     { Header: "% Complete", accessor: "percent_complete", sortable: true },
  //   ];

  const columns = [
    {
      Header: "Objective",
      accessor: "name",
      sortable: true,
      Cell: ({ row }) => (
        <Link
          to={`/objectives/${row.original.custom_id}`}
          className={styles.objectiveLink}
        >
          {row.original.name}
        </Link>
      ),
    },
    {
      Header: "Owner",
      accessor: "owner_id",
      sortable: true,
    },
    {
      Header: "Start Date",
      accessor: "start_date",
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
    {
      Header: "% Complete",
      accessor: "percent_complete",
      sortable: true,
    },
  ];

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
                  onClick={() => col.sortable && handleSort(col.accessor)}
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
              <tr key={obj.obj_id}>
                <td>{idx + 1}</td>
                {columns.map((col) => (
                  <td key={col.accessor}>
                    {col.Cell
                      ? col.Cell({ row: { original: obj } })
                      : obj[col.accessor]}
                  </td>
                ))}
                <td className={styles.rowMenu}>
                  <button
                    className={styles.menuBtn}
                    onClick={() => handleMenuToggle(obj.obj_id)}
                  >
                    <FaAngleDown />
                  </button>
                  {menuOpenRow === obj.custom_id && (
                    <div className={styles.menuDropDown}>
                      <button onClick={() => handleEdit(obj)}>Edit</button>
                      <button className={styles.deleteButton}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <SharedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ObjectiveForm
            objective={selectedObj}
            onClose={() => setIsModalOpen(false)}
          />
        </SharedModal>
      )}
    </>
  );
}

export default ObjectiveTable;
