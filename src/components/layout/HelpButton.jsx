import { useState, useRef, useEffect } from "react";
import { RiQuestionMark } from "react-icons/ri";
import styles from "./GenericButton.module.css";

function HelpButton() {
   const [isOpen, setIsOpen] = useState(false);
   const modalRef = useRef();

   // Close modal if clicking outside
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
            title="Help Button"
         >
            <RiQuestionMark />
         </button>

         {isOpen && (
            <div className={styles.modal}>
               <p>Help Page (Coming Soon!)</p>
            </div>
         )}
      </div>
   );
}

export default HelpButton;
