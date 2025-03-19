import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContact as createContactApi } from "../../services/apiContacts.js";
import toast from "react-hot-toast";

export function useCreateContact() {
   const queryClient = useQueryClient();

   const { mutate: createContact, isLoading: isCreating } = useMutation({
      mutationFn: (newContact) => createContactApi(newContact),
      onSuccess: (_, __, context) => {
         toast.success("Account successfully created");
         // Invalidates the "contact" query so the UI refreshes
         if (!context?.saveAndNew) {
            queryClient.invalidateQueries({ queryKey: ["contact"] });
         }
      },
      onError: (err) => {
         toast.error(err.message || "Failed to create contact");
      },
   });

   return { isCreating, createContact };
}
