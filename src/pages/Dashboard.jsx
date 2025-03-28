import backgroundImage from "../assets/bluesky.jpg";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./Dashboard.module.css";
import Spinner from "../ui/Spinner";

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
