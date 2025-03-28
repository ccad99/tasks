import { useMoveBack } from "../hooks/useMoveBack";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
   const moveBack = useMoveBack();

   return (
      <div className={styles.main}>
         <div className={styles.box}>
            <h1>The page you are looking for could not be found 😢</h1>
            <button onClick={moveBack}>&larr; Go back</button>
         </div>
      </div>
   );
}

export default PageNotFound;
