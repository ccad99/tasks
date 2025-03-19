import backgroundImage from "../assets/bluesky.jpg";
import styles from "./Dashboard.module.css";

function Dashboard() {
   return (
      <div className={styles.img}>
         <img
            src={backgroundImage}
            alt="Rock jutting out of the sea under a blue sky"
         />
      </div>
   );
}

export default Dashboard;
