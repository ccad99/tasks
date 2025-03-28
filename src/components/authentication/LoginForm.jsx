// LoginForm.jsx
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLogin } from "./useLogin";
import { useNavigate } from "react-router-dom";
import { BsCapslockFill } from "react-icons/bs";
import styles from "./LoginForm.module.css";

function LoginForm({ intendedPath = "/" }) {
   const { login, isLoggingIn } = useLogin();
   const navigate = useNavigate();
   const [isCapsLockOn, setIsCapsLockOn] = useState(false);

   const handleCapsLock = (e) => {
      const capsLock = e.getModifierState && e.getModifierState("CapsLock");
      setIsCapsLockOn(capsLock);
   };

   const handleForgotPassword = async (email) => {
      if (!email) {
         toast.error("Please enter your email to reset your password.");
         return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
         redirectTo: "http://localhost:5173/reset-password", // ✅ Update to your reset route
      });

      if (error) toast.error(error.message);
      else toast.success("Check your inbox for a reset link.");
   };

   useEffect(() => {
      const savedEmail = localStorage.getItem("rememberedEmail");
      if (savedEmail) formik.setFieldValue("email", savedEmail);
   }, []);

   const formik = useFormik({
      validateOnChange: false,
      validateOnBlur: true,
      initialValues: {
         email: "",
         password: "",
         remember: "",
      },
      validationSchema: Yup.object({
         email: Yup.string()
            .email("Invalid Email format")
            .required("Email is required"),
         password: Yup.string().required("Password is required"),
      }),
      onSubmit: (values, { resetForm }) => {
         if (values.remember) {
            localStorage.setItem("rememberedEmail", values.email);
         } else {
            localStorage.removeItem("rememberedEmail");
         }
         login(values, {
            onSuccess: () => {
               resetForm();
               navigate(intendedPath, { replace: true, state: null }); // ✅ This clears the 'fromProtectedRoute' flag
            },
         });
      },
   });

   return (
      <div className={styles.main}>
         <div className={styles.wrapper}>
            <div className={styles.standard_logo_wrapper}></div>
            <div className={styles.content}>
               <h2>Login to Your Account</h2>
               <div className={styles.formContainer}>
                  <form
                     className={styles.loginForm}
                     onSubmit={formik.handleSubmit}
                  >
                     <div className={styles.inputGroup}>
                        <label>Username</label>
                        <div className={styles.inputField}>
                           <input
                              type="email"
                              name="email"
                              onChange={formik.handleChange}
                              value={formik.values.email}
                           />
                           {formik.errors.email && (
                              <p className={styles.error}>
                                 {formik.errors.email}
                              </p>
                           )}
                        </div>
                        <label>Password</label>
                        <input
                           type="password"
                           name="password"
                           onChange={formik.handleChange}
                           onKeyUp={handleCapsLock}
                           value={formik.values.password}
                        />
                        {isCapsLockOn && (
                           <div className={styles.pwcaps}>
                              <BsCapslockFill />
                              &nbsp;Caps Lock is on
                           </div>
                        )}

                        {formik.errors.password && (
                           <p className={styles.error}>
                              {formik.errors.password}
                           </p>
                        )}
                     </div>

                     <div className={styles.buttonContainer}>
                        <button
                           type="submit"
                           className={styles.primaryButton}
                           disabled={isLoggingIn}
                        >
                           Log In
                        </button>
                        <button
                           type="button"
                           className={styles.cancelButton}
                           onClick={() => navigate("/")}
                        >
                           Cancel
                        </button>
                     </div>

                     <label className={styles.remContainer}>
                        <input
                           type="checkbox"
                           name="remember"
                           onChange={formik.handleChange}
                           checked={formik.values.remember}
                        />
                        Remember Me
                     </label>

                     <div className={styles.forgotPassword}>
                        <a
                           href="#"
                           onClick={() =>
                              handleForgotPassword(formik.values.email)
                           }
                        >
                           Forgot your password?
                        </a>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}

export default LoginForm;
