// src/features/tasks/useTaskSave.js
import { useCreateTask } from "./useCreateTask";
import { useUpdateTask } from "./useUpdateTask";
import { useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { buildSaveOptions } from "../../helpers/saveHelpers";
import toast from "react-hot-toast";

export function useTaskSave(isEditing, task) {
   const queryClient = useQueryClient();
   const { createTask, isCreating } = useCreateTask();
   const { updateTask, isUpdating } = useUpdateTask();

   const saveTask = async (values, options = {}) => {
      // Resolve user
      let user = queryClient.getQueryData(["user"]) || (await getCurrentUser());
      if (user) queryClient.setQueryData(["user"], user);

      if (!user?.custom_id) {
         toast.error("You must be logged in to perform this action.");
         return;
      }

      // Finalized save options
      const saveOptions = buildSaveOptions(options);

      // Optional Pre-save hook
      saveOptions.onBeforeSave?.(values);

      // Actual save
      const payload = isEditing
         ? { custom_id: task.custom_id, updateFields: values, user }
         : values;

      const action = isEditing ? updateTask : createTask;
      action(payload, saveOptions);
   };

   return {
      saveTask,
      isCreating,
      isUpdating,
   };
}
