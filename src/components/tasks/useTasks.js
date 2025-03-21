/*
 *   Custom hook to get array of tasks.
 */

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks } from "../../services/apiTasks";

export function useTasks() {
   const queryClient = useQueryClient();

   const {
      isLoading,
      data: tasks = [], // Default to an empty array to prevent undefined issues
      error,
   } = useQuery({
      queryKey: ["task"],
      queryFn: getTasks, // No need to wrap it in an arrow function
      staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
   });

   return { tasks, isLoading, error };
}
