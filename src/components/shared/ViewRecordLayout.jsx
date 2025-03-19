import React from "react";
import styles from "./ViewRecordLayout.module.css";

const ViewRecordLayout = ({
   title,
   headerContent,
   leftColumn,
   rightColumn,
}) => {
   return (
      <div className={styles.background}>
         <br />
         <div className={styles.pageContainer}>
            {/* Header */}
            <div className={styles.header}>
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
