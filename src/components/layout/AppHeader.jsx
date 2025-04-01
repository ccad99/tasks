import React, { useState } from "react";
import { useAuth } from "../authentication/AuthProvider";
import { Link } from "react-router-dom";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa6";
import { RiLogoutBoxRLine } from "react-icons/ri";
import LogoutButton from "./LogoutButton";
import HomeButton from "./HomeButton";
import HelpButton from "./HelpButton";
import UserProfile from "./UserProfile";
import SettingsButton from "./SettingsButton";
import styles from "./AppHeader.module.css";

function AppHeader() {
   const [selectedItem, setSelectedItem] = useState(null);
   const { user } = useAuth();

   return (
      <div>
         <header className={styles.header}>
            <div className={styles.right}>
               {/* Other icons can go here */}
               <HomeButton />
               <SettingsButton />
               <HelpButton />
               <UserProfile /> {/* New! */}
               <LogoutButton />
            </div>
         </header>
         <nav className={styles.pageNav}>
            <ol className={styles.navItems}>
               {[
                  "Accounts",
                  "Contacts",
                  "Groups",
                  "Calendar",
                  "Plans",
                  "Goals",
                  "Objectives",
                  "Tasks",
               ].map((item) => (
                  <li
                     key={item}
                     className={`${styles.navItem} ${
                        selectedItem === item ? styles.selectedNavItem : ""
                     }`}
                     onClick={() => setSelectedItem(item)}
                  >
                     <Link
                        to={
                           item === "Accounts"
                              ? "/accounts"
                              : item === "Contacts"
                              ? "/contacts"
                              : item === "Tasks"
                              ? "/tasks"
                              : item === "Groups"
                              ? "/coming-soon?title=Groups"
                              : item === "Calendar"
                              ? "/coming-soon?title=Calendar"
                              : item === "Objectives"
                              ? "objectives"
                              : item === "Goals"
                              ? "/coming-soon?title=Goals"
                              : item === "Plans"
                              ? "/coming-soon?title=Plans"
                              : "/coming-soon"
                        }
                        className={styles.navLink}
                     >
                        {item}
                     </Link>
                  </li>
               ))}
            </ol>
         </nav>
      </div>
   );
}

export default AppHeader;
