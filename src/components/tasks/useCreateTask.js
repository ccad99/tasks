import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask as createTaskApi } from "../../services/apiTasks.js";
import toast from "react-hot-toast";
import { emptyTaskValues } from "./taskDefaults.js";

export function useCreateTask() {
   /*   ENABLE FOR PROD  */
   const queryClient = useQueryClient();
   const user = queryClient.getQueryData(["user"]); // Get logged-in user info

   const { mutate: createTask, isLoading: isCreating } = useMutation({
      mutationFn: (newTask) => {
         if (!user?.custom_id) {
            throw new Error("No logged-in user. Cannot create task.");
         }
         createTaskApi({
            ...newTask,
            created_by: user.custom_id,
            lastmodified_by: user.custom_id,
         });
      },
      onSuccess: (_, __, { saveAndNew, resetForm } = {}) => {
         toast.success("Task successfully created");
         // Always invalidate since a new record was added
         if (saveAndNew) {
            resetForm({ values: emptyTaskValues });
         } else {
            queryClient.invalidateQueries({ queryKey: ["task"] });
            onClose?.();
         }
      },
      onError: (err) => {
         console.error("Error creating/updating task:", err); // 🔍 Logs the full error
         toast.error(err.message || "Failed to create task");
      },
   });

   return { isCreating, createTask };
}
