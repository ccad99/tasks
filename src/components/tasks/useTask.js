/*
 *   Custom hook to get a single task by custom_id
 */

import { useQuery } from "@tanstack/react-query";
import { getTask } from "../../services/apiTasks";

export function useTask(custom_id) {
   const {
      isLoading,
      data: task,
      error,
   } = useQuery({
      queryKey: ["task", custom_id],
      queryFn: () => getTask(custom_id),
      retry: false,
   });

   return { isLoading, error, task };
}

///////////////////////////////////////////////////////////
/*
 *   OLD VERSION - USED URL PARAMS TO GET RECORD ID
 *
 *
 */

/*

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

*/
