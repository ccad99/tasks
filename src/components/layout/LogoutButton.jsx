// LogoutButton.jsx
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "../../components/authentication/useLogout";
import styles from "./GenericButton.module.css";

function LogoutButton() {
   const { logout, isLoading } = useLogout();

   const handleClick = () => {
      if (window.confirm("You are about to log out. Are you sure?")) {
         logout();
      }
   };

   return (
      <button
         onClick={handleClick}
         disabled={isLoading}
         className={styles.button}
         title="Log Out"
      >
         <HiArrowRightOnRectangle />
      </button>
   );
}

export default LogoutButton;
