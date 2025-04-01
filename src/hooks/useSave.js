// Universal Save hook - currently using for saving a new or modified task from TaskForm.jsx
// src/hooks/useSave.js
import { useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";
import toast from "react-hot-toast";

export function useSave({
   createMutation,
   updateMutation,
   resourceName = "Record",
}) {
   const queryClient = useQueryClient();

   const save = async ({ isEditing, record, values, options = {} }) => {
      const {
         onClose,
         onSuccess,
         resetForm,
         saveAndNew,
         onBeforeSave,
         successMessage,
         errorMessage,
      } = options;

      let user = queryClient.getQueryData(["user"]) || (await getCurrentUser());
      if (user) queryClient.setQueryData(["user"], user);

      if (!user?.custom_id) {
         toast.error("You must be logged in to perform this action.");
         return;
      }

      onBeforeSave?.(values);

      const payload = isEditing
         ? { custom_id: record.custom_id, updateFields: values, user }
         : {
              ...values,
              created_by: user.custom_id,
              lastmodified_by: user.custom_id,
           };

      const action = isEditing ? updateMutation : createMutation;

      action(payload, {
         onSuccess: () => {
            toast.success(
               successMessage || `${resourceName} saved successfully`
            );
            if (saveAndNew) resetForm({ values: {} });
            else queryClient.invalidateQueries();
            onSuccess?.();
            onClose?.();
         },
         onError: (err) => {
            toast.error(
               err.message || errorMessage || `Failed to save ${resourceName}`
            );
         },
      });
   };

   return { save };
}
