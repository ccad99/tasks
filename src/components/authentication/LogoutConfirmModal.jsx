import { useLogout } from "./useLogout";
import styles from "./LogoutConfirmModal.module.css";

function LogoutConfirmModal({ onClose }) {
   const { logout } = useLogout();

   function handleConfirm() {
      onclose(); //close modal first
      logout(); // then logout
   }

   return (
      <div className={styles.modalBackdrop}>
         <div className={styles.modal}>
            <h2>Log out</h2>
            <p>You are about to log out. Are you sure?</p>
            <div className={styles.buttons}>
               <button onClick={handleConfirm}>Yes</button>
               <button onClick={onClose}>No</button>
            </div>
         </div>
      </div>
   );
}

export default LogoutConfirmModal;
