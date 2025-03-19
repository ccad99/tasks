import React from "react";
import styles from "./SharedModal.module.css";

const SharedModal = ({ isOpen, onClose, children }) => {
   if (!isOpen) return null;

   return (
      <div className={styles.modalOverlay}>
         <div className={styles.modalContainer}>
            {/* Close Button (Floating X) */}
            <button className={styles.closeButton} onClick={onClose}>
               ✖
            </button>
            {children}
         </div>
      </div>
   );
};

export default SharedModal;
