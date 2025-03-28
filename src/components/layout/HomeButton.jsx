import { HiOutlineHome } from "react-icons/hi2";
import { BiHomeAlt } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import styles from "./GenericButton.module.css";
import { useNavigate } from "react-router-dom";

function HomeButton() {
   const navigate = useNavigate();

   const handleClick = () => {
      navigate("/dashboard");
   };

   return (
      <button
         onClick={handleClick}
         className={`${styles.button} ${styles.home}`}
         title="Home"
      >
         {/* <HiOutlineHome /> */}
         <BiHomeAlt />
         {/* <AiOutlineHome /> */}
      </button>
   );
}

export default HomeButton;
