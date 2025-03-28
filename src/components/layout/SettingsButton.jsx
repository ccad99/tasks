import { useState, useRef, useEffect } from "react";
import { VscSettingsGear } from "react-icons/vsc";
import styles from "./GenericButton.module.css";

function SettingsButton() {
   const [isOpen, setIsOpen] = useState(false);
   const modalRef = useRef();

   //close modal if clicking outside

   useEffect(() => {
      function handleClickOutside(event) {
         if (!modalRef.current?.contains(event.target)) {
            setIsOpen(false);
         }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
         document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   return (
      <div ref={modalRef} className={styles.wrapper}>
         <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={styles.button}
            title="Settings Button"
         >
            <VscSettingsGear />
         </button>
         {isOpen && (
            <div className={styles.modal}>
               <p>Settings Page (Coming Soon!)</p>
            </div>
         )}
      </div>
   );
}

export default SettingsButton;
