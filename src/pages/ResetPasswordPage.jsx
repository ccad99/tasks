import { useState } from "react";
import styles from "./ResetPassword.module.css";
import toast from "react-hot-toast";
import supabase from "../services/supabase";

function ResetPasswordPage() {
   const [email, setEmail] = useState("");

   async function handleSubmit(e) {
      e.preventDefault();

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
         redirectTo: `${window.location.origin}/update-password`, // or use env var
      });

      if (error) {
         toast.error(error.message);
      } else {
         toast.success("Password reset email sent!");
      }
   }

   return (
      <div className={styles.resetContainer}>
         <h2>Reset Your Password</h2>
         <form onSubmit={handleSubmit} className={styles.form}>
            <input
               type="email"
               placeholder="Enter your email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
            />
            <button type="submit">Send Reset Link</button>
         </form>
      </div>
   );
}

export default ResetPasswordPage;
