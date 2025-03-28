import { useMutation } from "@tanstack/react-query";
import { updateTask as updateTaskApi } from "../../services/apiTasks.js";
import { emptyTaskValues } from "./taskDefaults.js";
import toast from "react-hot-toast";
import { useInvalidateRelatedTasks } from "../../hooks/useInvalidateRelatedTasks"; // ✅ import it

export function useUpdateTask() {
   const invalidateRelatedTasks = useInvalidateRelatedTasks();

   const { mutate: updateTask, isLoading: isUpdating } = useMutation({
      mutationFn: async ({ custom_id, updateFields, user }) => {
         if (!user?.custom_id) {
            toast.error("You must be logged in to perform this action.");
            throw new Error("No logged-in user available during task update.");
         }

         return await updateTaskApi(custom_id, {
            ...updateFields,
            lastmodified_by: user.custom_id,
         });
      },

      onSuccess: (_, variables, context = {}) => {
         const { saveAndNew, resetForm, onClose, onSuccess } = context;
         const { custom_id, updateFields } = variables;

         toast.success("Task successfully updated");

         // Invalidate this task's detail view
         context?.queryClient?.invalidateQueries({
            queryKey: ["task", custom_id],
         });

         // Invalidate all related task views
         invalidateRelatedTasks(updateFields);

         if (saveAndNew) {
            resetForm?.({ values: emptyTaskValues });
         } else {
            onSuccess?.();
            onClose?.();
         }
      },

      onError: (err) => {
         console.error("❌ Task update failed:", err);
         toast.error(err.message || "Failed to update task");
      },
   });

   return { isUpdating, updateTask };
}
