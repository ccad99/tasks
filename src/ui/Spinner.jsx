import { BiLoaderCircle, BiLoaderAlt } from "react-icons/bi";
import styles from "./Spinner.module.css";

const Spinner = ({ useAlt = false, useMini = false }) => {
   const Icon = useAlt ? BiLoaderAlt : BiLoaderCircle;
   const classNames = `${styles.loader} ${useMini ? styles.mini : ""}`;

   return (
      <div className={styles.overlay}>
         <Icon className={classNames} />
      </div>
   );
};

export default Spinner;
