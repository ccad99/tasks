import React from "react";
import styles from "./ButtonGroup.module.css";

const ButtonGroup = ({ isSubmitting, onClose, handleSubmit }) => {
   return (
      <div className={styles.buttonContainer}>
         <button
            type="button"
            className={styles.cancelButton}
            onClick={onClose}
         >
            Cancel
         </button>
         <button
            type="button"
            className={styles.primaryButton}
            disabled={isSubmitting}
            onClick={() => handleSubmit(true)} //Save and New
         >
            Save & New
         </button>
         <button
            type="button"
            className={styles.primaryButton}
            disabled={isSubmitting}
            onClick={() => handleSubmit(false)} // Normal Save
         >
            Save
         </button>
      </div>
   );
};

export default ButtonGroup;
