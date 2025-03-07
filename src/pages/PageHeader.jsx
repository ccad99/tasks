import styles from "./PageHeader.module.css";

function PageHeader() {
   return (
      <div>
         <div>
            <h1>This is the Top Row</h1>
         </div>
         <nav className={styles.pageNav}>
            <ol className={styles.navItems}>
               <li>Contacts</li>
               <li>Organizations</li>
               <li>Tasks</li>
               <li>Help</li>
            </ol>
         </nav>
      </div>
   );
}

export default PageHeader;
