/*
 *   Custom hook to get a single objective by custom_id
 */

import { useQuery } from "@tanstack/react-query";
import { getObjective } from "../../services/apiObjectives";

export function useObjective(custom_id) {
  const {
    isLoading,
    data: objective,
    error,
  } = useQuery({
    queryKey: ["objective", custom_id],
    queryFn: () => getObjective(custom_id),
    retry: false,
  });

  return { isLoading, error, objective };
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
