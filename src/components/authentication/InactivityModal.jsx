import React from "react";

function InactivityModal({ onConfirm, onLogout }) {
   return (
      <div className={styles.modalOverlay}>
         <div className={styles.modalContent}>
            <h3>Are you still there?</h3>
            <p>You’ll be logged out in 1 minute due to inactivity.</p>
            <div className={styles.buttonGroup}>
               <button onClick={onConfirm}>I'm Still Here</button>
               <button onClick={onLogout}>Log Me Out</button>
            </div>
         </div>
      </div>
   );
}

export default InactivityModal;
