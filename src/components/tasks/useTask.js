import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTask } from "../../services/apiTasks";

export function useTask() {
   const { taskId } = useParams();

   const {
      isLoading,
      data: task,
      error,
   } = useQuery({
      queryKey: ["task", taskId],
      queryFn: () => getTask(taskId),
      retry: false,
   });

   return { isLoading, error, task };
}
