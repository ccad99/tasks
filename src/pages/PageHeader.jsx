import React, { useState } from "react";
import styles from "./PageHeader.module.css";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi2";

function PageHeader() {
   const [selectedItem, setSelectedItem] = useState("Tasks");

   return (
      <div>
         <div>
            <h1>
               <div className={styles.homeIcon}>
                  <Link to={"/"}>
                     <HiOutlineHome />
                  </Link>
               </div>
            </h1>
         </div>
         <nav className={styles.pageNav}>
            <ol className={styles.navItems}>
               {["Accounts", "Contacts", "Tasks", "Login", "Help"].map(
                  (item) => (
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
                                 : item === "Login"
                                 ? "/login"
                                 : "/"
                           }
                           className={styles.navLink}
                        >
                           {item}
                        </Link>
                     </li>
                  )
               )}
            </ol>
         </nav>
      </div>
   );
}

export default PageHeader;
