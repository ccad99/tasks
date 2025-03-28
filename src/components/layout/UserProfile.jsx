// src/components/layout/UserProfile.jsx
import { useState, useRef, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { formatDistanceToNow } from "date-fns";
import styles from "./UserProfile.module.css";

function UserProfile() {
   const [isOpen, setIsOpen] = useState(false);
   const [user, setUser] = useState(null);
   const modalRef = useRef();
   const navigate = useNavigate();
   const queryClient = useQueryClient();

   // Close modal on outside click
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

   // Fetch user on modal open
   useEffect(() => {
      if (isOpen) {
         let currentUser = queryClient.getQueryData(["user"]);

         const fetchUser = async () => {
            if (!currentUser) {
               currentUser = await getCurrentUser();
               if (currentUser) {
                  queryClient.setQueryData(["user"], currentUser);
               }
            }
            setUser(currentUser);
         };

         fetchUser();
      }
   }, [isOpen, queryClient]);

   const handleLogout = () => navigate("/login");
   const handleLogin = () => navigate("/login");

   return (
      <div ref={modalRef} className={styles.profileWrapper}>
         <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={styles.profileBtn}
            title="User Profile"
         >
            <FaRegUserCircle />
         </button>

         {isOpen && (
            <div className={styles.modal}>
               {user ? (
                  <>
                     <p>
                        <strong>Logged-in user:</strong>{" "}
                        {user.name || user.email}
                     </p>
                     <p>
                        <strong>Logged-in duration:</strong>{" "}
                        {user.lastlogin_date
                           ? formatDistanceToNow(
                                new Date(user.lastlogin_date),
                                { addSuffix: true }
                             )
                           : "Unknown"}
                     </p>
                     <button className={styles.linkBtn} onClick={handleLogout}>
                        Logout Now
                     </button>
                  </>
               ) : (
                  <>
                     <p>You&apos;re not logged in.</p>
                     <button className={styles.linkBtn} onClick={handleLogin}>
                        Login Now
                     </button>
                  </>
               )}
            </div>
         )}
      </div>
   );
}

export default UserProfile;
