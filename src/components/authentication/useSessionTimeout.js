import { useEffect, useRef } from "react";

export function useSessionTimeout({ onTimeout, timeout = 30 * 60 * 1000 }) {
   const timeoutRef = useRef(null);

   const resetTimer = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(onTimeout, timeout);
   };

   useEffect(() => {
      const events = ["mousemove", "keydown", "scroll", "click"];
      events.forEach((event) => window.addEventListener(event, resetTimer));
      resetTimer(); // Start the timer initially

      return () => {
         events.forEach((event) =>
            window.removeEventListener(event, resetTimer)
         );
         if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
   }, [timeout, onTimeout]);
}
