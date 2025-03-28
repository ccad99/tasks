// src/components/layout/AppLayout.jsx
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { getCurrentUser } from "../../services/apiAuth";
import { useSessionTimeout } from "../authentication/useSessionTimeout";
import AppHeader from "./AppHeader";

function AppLayout() {
   const queryClient = useQueryClient();

   //warm the cache
   useEffect(() => {
      const warmCache = async () => {
         const cached = queryClient.getQueryData(["user"]);
         if (!cached) {
            const user = await getCurrentUser();
            if (user) queryClient.setQueryData(["user"], user);
         }
      };
      warmCache();
   }, [queryClient]);

   useSessionTimeout(() => {
      console.log("Session timed out!");
      // Trigger logout or modal here
   }, 60 * 60 * 1000); // Optional: set to 1 hour for dev

   return (
      <>
         <AppHeader />
         <main>
            <Outlet />
         </main>
      </>
   );
}

export default AppLayout;
