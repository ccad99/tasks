import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAccount as createAccountApi } from "../../services/apiAccounts.js";
import toast from "react-hot-toast";

export function useCreateAccount() {
   const queryClient = useQueryClient();

   const { mutate: createAccount, isLoading: isCreating } = useMutation({
      mutationFn: (newAccount) => createAccountApi(newAccount),
      onSuccess: (_, __, context) => {
         toast.success("Account successfully created");
         // Invalidates the "accounts" query so the UI refreshes
         if (!context?.saveAndNew) {
            queryClient.invalidateQueries({ queryKey: ["account"] });
         }
      },
      onError: (err) => {
         toast.error(err.message || "Failed to create account");
      },
   });

   return { isCreating, createAccount };
}
