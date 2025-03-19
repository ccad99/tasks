import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateContact as updateContactApi } from "../../services/apiContacts.js";
import toast from "react-hot-toast";

export function useUpdateContact() {
   const queryClient = useQueryClient();

   const { mutate: updateContact, isLoading: isUpdating } = useMutation({
      mutationFn: ({ custom_id, updateFields }) =>
         updateContactApi(custom_id, updateFields),
      onSuccess: (_, __, context) => {
         toast.success("Contact successfully updated");
         // Invalidates the "contacts" query so the UI refreshes
         if (!context?.saveAndNew) {
            queryClient.invalidateQueries({ queryKey: ["contact"] });
         }
      },
      onError: (err) => {
         toast.error(err.message || "Failed to update contact");
      },
   });

   return { isUpdating, updateContact };
}
