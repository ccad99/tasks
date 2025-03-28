// src/ui/ProtectedRoute.jsx
//
//  Jonas Code
//

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/authentication/useUser";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
   //1. Load the authenticated user data
   const { user, isLoading, isAuthenticated } = useUser();
   const navigate = useNavigate();

   //3. If no auth user, then redirect to Login page - needs to come before IF statement because it is a HOOK
   useEffect(
      function () {
         if (!isAuthenticated && !isLoading) navigate("/login");
      },
      [isAuthenticated, isLoading, navigate]
   );

   //2. While data is loading show spinner
   if (isLoading)
      return (
         // <FullPage>
         <Spinner />
         // </FullPage>
      );

   //4. if user is auth, render the app
   if (isAuthenticated) {
      return children;
   }
}

//
//  CHAT GPT Code
//
// import { Navigate } from "react-router-dom";  //chatGPT
// import { useQueryClient } from "@tanstack/react-query";
// function ProtectedRoute({ children }) {
//    const queryClient = useQueryClient();
//    const user = queryClient.getQueryData(["user"]);

//    if (!user) {
//       return <Navigate to="/login" replace />;
//    }

//    return children;
// }

export default ProtectedRoute;
