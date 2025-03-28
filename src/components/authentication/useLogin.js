// src/components/authentication/useLogin.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import { useUpdateAppUser } from "./useUpdateAppUser"; // <-- add this
import toast from "react-hot-toast";

export function useLogin() {
   const queryClient = useQueryClient();
   const navigate = useNavigate();
   const { updateAppUser } = useUpdateAppUser(); // <-- grab the mutation

   const { mutate: login, isLoading: isLoggingIn } = useMutation({
      mutationFn: loginApi,
      onSuccess: (user) => {
         console.log("🚀 onSuccess fired with user:", user);

         // Step 1 — Cache immediately
         queryClient.setQueryData(["user"], user);
         localStorage.setItem("user", JSON.stringify(user));

         // Step 2 — Update lastlogin_date in DB
         const timestamp = new Date().toISOString();
         updateAppUser({
            custom_id: user.custom_id,
            fieldsToUpdate: { lastlogin_date: timestamp },
         });

         // Step 3 — Navigate
         toast.success("Login successful");
         navigate("/", { replace: true });
      },
      onError: (err) => {
         console.error("Login error", err);
         toast.error("Invalid email address or password");
      },
   });

   return { login, isLoggingIn };
}
