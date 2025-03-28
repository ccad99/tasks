import React from "react";
import { useMoveBack } from "../../hooks/useMoveBack"; // You already have this!
import { HiArrowLeft } from "react-icons/hi2";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./ViewRecordLayout.module.css";

const ViewRecordLayout = ({
   title,
   headerContent,
   leftColumn,
   rightColumn,
}) => {
   const moveBack = useMoveBack();

   return (
      <div className={styles.background}>
         <br />
         <div className={styles.pageContainer}>
            {/* Header */}
            <div className={styles.header}>
               <span onClick={moveBack} className={styles.backLink}>
                  <FaArrowLeft />
               </span>
               <h2>{title}</h2>
               <div className={styles.headerContent}>{headerContent}</div>
            </div>

            {/* Main Layout */}
            <div className={styles.contentContainer}>
               <div className={styles.leftColumn}>{leftColumn}</div>
               <div className={styles.rightColumn}>{rightColumn}</div>
            </div>
         </div>
      </div>
   );
};

export default ViewRecordLayout;
