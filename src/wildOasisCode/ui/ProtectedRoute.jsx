import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
   height: 100vh;
   background-color: var(--color-grey-50);
   display: flex;
   align-items: center;
   justify-content: center;
`;

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
         <FullPage>
            <Spinner />
         </FullPage>
      );

   //4. if user is auth, render the app
   if (isAuthenticated) {
      return children;
   }
}

export default ProtectedRoute;
