import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAccount as updateAccountApi } from "../../services/apiAccounts.js";
import toast from "react-hot-toast";

export function useUpdateAccount() {
   const queryClient = useQueryClient();

   const { mutate: updateAccount, isLoading: isUpdating } = useMutation({
      mutationFn: ({ custom_id, updateFields }) =>
         updateAccountApi(custom_id, updateFields),
      onSuccess: (_, __, context) => {
         toast.success("Account successfully updated");
         // Invalidates the "accounts" query so the UI refreshes
         if (!context?.saveAndNew) {
            queryClient.invalidateQueries({ queryKey: ["account"] });
         }
      },
      onError: (err) => {
         toast.error(err.message || "Failed to update account");
      },
   });

   return { isUpdating, updateAccount };
}
