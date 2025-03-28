// src/pages/ComingSoon.jsx
import { useLocation } from "react-router-dom";
import styles from "./ComingSoon.module.css";

function ComingSoon() {
   const location = useLocation();
   const searchParams = new URLSearchParams(location.search);
   const title = searchParams.get("title") || "Cool Stuff";

   let icon;

   switch (title) {
      case "Groups":
         icon = "/favicon.ico";
         break;
      case "Plans":
         icon = "/puzzled.ico";
         break;
      case "Goals":
         icon = "/winning.ico";
         break;
      default:
         icon = "/random.ico";
   }

   return (
      <div className={styles.container}>
         <h1 className={styles.title}>{title}</h1>
         <h1 className={styles.title}>🚧 Feature Coming Soon! 🚧</h1>
         <img
            src={icon}
            alt="Under Construction"
            className={styles.animatedImage}
         />
      </div>
   );
}

export default ComingSoon;
