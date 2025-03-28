import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/authentication/AuthProvider";

function ProtectedRoute({ children }) {
   const { user } = useAuth();
   const location = useLocation();

   // if (!user) {
   //    return (
   //       <Navigate
   //          to="/login"
   //          replace
   //          state={{
   //             fromProtectedRoute: true,
   //             intendedPath: location.pathname,
   //          }}
   //       />
   //    );
   // }

   return children;
}

export default ProtectedRoute;
