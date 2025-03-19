import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask as createTaskApi } from "../../services/apiTasks.js";
import toast from "react-hot-toast";

export function useCreateTask() {
   const queryClient = useQueryClient();

   const { mutate: createTask, isLoading: isCreating } = useMutation({
      mutationFn: (newTask) => createTaskApi(newTask),
      onSuccess: () => {
         toast.success("Task successfully created");
         queryClient.invalidateQueries({
            queryKey: ["task"],
         });
      },
      onError: (err) => toast.error(err.message),
   });

   return { isCreating, createTask };
}
