import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/authentication/LoginForm";
import toast from "react-hot-toast";

function LoginPage() {
   const location = useLocation(null);
   let redirected = location.state?.fromProtectedRoute;
   let intendedPath = location.state?.intendedPath || "/";

   useEffect(() => {
      if (redirected) {
         toast.error("Please log in to access the requested page.");
      }
   }, [redirected]);

   return <LoginForm intendedPath={intendedPath} />;
}

export default LoginPage;
