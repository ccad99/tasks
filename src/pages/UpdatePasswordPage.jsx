import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import supabase from "../services/supabase";
import toast from "react-hot-toast";
import styles from "./ResetPassword.module.css";

function UpdatePasswordPage() {
   const navigate = useNavigate();
   const [isSessionValid, setIsSessionValid] = useState(false);
   const [password, setPassword] = useState("");
   const location = useLocation();
   const searchParams = new URLSearchParams(location.search);
   const type = searchParams.get("type");

   useEffect(() => {
      async function checkSession() {
         const { data, error } = await supabase.auth.getSession();

         if (error || !data?.session?.user) {
            toast.error("Invalid or expired reset link");
            return;
         }

         setIsSessionValid(true);
      }

      checkSession();
   }, []);

   async function handleSubmit(e) {
      e.preventDefault();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) return toast.error(error.message);

      toast.success("Password updated successfully!");

      // You might want to redirect to login or home
      navigate("/login");
   }

   if (type !== "recovery")
      return <p>This page is only accessible via a password reset link.</p>;

   if (!isSessionValid) return <p>Checking session...</p>;

   return (
      <form onSubmit={handleSubmit} className={styles.form}>
         <h2>Set a New Password</h2>
         <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
         />
         <button type="submit">Update Password</button>
      </form>
   );
}

export default UpdatePasswordPage;
