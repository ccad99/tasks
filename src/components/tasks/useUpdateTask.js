import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask as updateTaskApi } from "../../services/apiTasks.js";
import toast from "react-hot-toast";
import { emptyTaskValues } from "./taskDefaults.js";

export function useUpdateTask() {
   const queryClient = useQueryClient();
   const user = queryClient.getQueryData(["user"]); //Get logged-in user info

   const { mutate: updateTask, isLoading: isUpdating } = useMutation({
      mutationFn: ({ custom_id, updateFields }) =>
         updateTaskApi(custom_id, {
            ...updateFields,
            lastmodified_by: user.custom_id,
         }),
      onSuccess: (_, vars, { saveAndNew, resetForm } = {}) => {
         toast.success("Task successfully updated");
         // Only invalidate queries if fields were actually updated
         if (Object.keys(vars.updateFields).length > 0) {
            queryClient.invalidateQueries({ queryKey: ["task"] });
         }

         if (saveAndNew) {
            resetForm({ values: emptyTaskValues });
         } else {
            queryClient.invalidateQueries({ queryKey: ["task"] });
            // 🟢 Close the form if Save (not Save & New)
            onClose?.();
         }
      },
      onError: (err) => {
         console.error("Error creating/updating task:", err); // 🔍 Logs the full error
         toast.error(err.message || "Failed to create task");
      },
   });

   return { isUpdating, updateTask };
}
