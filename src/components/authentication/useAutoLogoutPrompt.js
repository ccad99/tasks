// src/hooks/useAutoLogoutPrompt.js
import { useEffect, useRef } from "react";

export function useAutoLogoutPrompt(timeoutMinutes = 30) {
   const timeout = timeoutMinutes * 60 * 1000;
   const warningTime = 2 * 60 * 1000; // 2 minutes before logout
   const lastActivityRef = useRef(Date.now());
   const promptShownRef = useRef(false);

   useEffect(() => {
      const updateActivity = () => {
         lastActivityRef.current = Date.now();
         promptShownRef.current = false;
      };

      const handleInactivityCheck = () => {
         const now = Date.now();
         const elapsed = now - lastActivityRef.current;

         if (elapsed > timeout) {
            // Auto logout
            localStorage.removeItem("user");
            window.location.href = "/login";
         } else if (
            elapsed > timeout - warningTime &&
            !promptShownRef.current
         ) {
            promptShownRef.current = true;
            const stayLoggedIn = window.confirm(
               "You've been inactive for a while. Stay logged in?"
            );
            if (stayLoggedIn) {
               updateActivity();
            }
         }
      };

      const intervalId = setInterval(handleInactivityCheck, 60000); // every 1 minute

      window.addEventListener("mousemove", updateActivity);
      window.addEventListener("keydown", updateActivity);

      return () => {
         clearInterval(intervalId);
         window.removeEventListener("mousemove", updateActivity);
         window.removeEventListener("keydown", updateActivity);
      };
   }, [timeout]);
}
