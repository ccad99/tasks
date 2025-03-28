import { useState, useEffect, createContext, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSessionTimeout } from "./useSessionTimeout";
import supabase from "../../services/supabase";
import InactivityModal from "./InactivityModal";

const AuthContext = createContext();

export function AuthProvider({ children, timeoutDuration = 30 * 60 * 1000 }) {
   const queryClient = useQueryClient();
   const [user, setUser] = useState(() =>
      JSON.parse(localStorage.getItem("user"))
   );
   const [showModal, setShowModal] = useState(false);

   useEffect(() => {
      if (user) queryClient.setQueryData(["user"], user);
   }, [user, queryClient]);

   const logoutUser = async () => {
      localStorage.removeItem("user");
      setUser(null);
      await supabase.auth.signOut();
      queryClient.removeQueries(["user"]);
      window.location.href = "login";
   };

   useSessionTimeout({
      timeout: timeoutDuration - 60 * 1000, // 1 min before logout
      onTimeout: () => setShowModal(true),
   });

   const confirmStayLoggedIn = () => {
      setShowModal(false); // Resets timer via hook
   };

   return (
      <AuthContext.Provider value={{ user, setUser, logoutUser }}>
         {children}
         {showModal && (
            <InactivityModal
               onConfirm={confirmStayLoggedIn}
               onLogout={logoutUser}
            />
         )}
      </AuthContext.Provider>
   );
}

export const useAuth = () => useContext(AuthContext);
