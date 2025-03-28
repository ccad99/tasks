/*
 *  modified to get tasks from the task_view, not the table.
 */

import { useQuery } from "@tanstack/react-query";
// import { getTasksSorted } from "../../services/apiTasks";
import { getTasksFromView } from "../../services/apiTasks";

export function useTasksSorted(sortBy = "subject", order = "asc") {
   const {
      data: tasks = [], // Ensure data is named "tasks" and prevent undefined
      isLoading,
      error,
   } = useQuery({
      queryKey: ["task", "view", sortBy, order],
      queryFn: () => getTasksFromView({ sortBy, order }),
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
   });

   return { tasks, isLoading, error };
}

/*
 *  Original logic
 */

// import { useQuery } from "@tanstack/react-query";
// import { getTasksSorted } from "../../services/apiTasks";

// export function useTasksSorted(sortBy = "subject", order = "asc") {
//    const {
//       data: tasks = [], // Ensure data is named "tasks" and prevent undefined
//       isLoading,
//       error,
//    } = useQuery({
//       queryKey: ["task", sortBy, order],
//       queryFn: () => getTasksSorted(sortBy, order ),
//       staleTime: 5 * 60 * 1000,
//       cacheTime: 30 * 60 * 1000,
//    });

//    return { tasks, isLoading, error };
// }
