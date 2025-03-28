// useInvalidateRelatedTasks.js
import { useQueryClient } from "@tanstack/react-query";

export function useInvalidateRelatedTasks() {
   const queryClient = useQueryClient();

   const invalidate = (fields = {}) => {
      const relationKeys = {
         who_id: "contactTasks",
         what_id: "accountTasks",
         goal_id: "goalTasks",
         objective_id: "objectiveTasks",
         plan_id: "planTasks",
      };

      Object.entries(relationKeys).forEach(([field, queryKey]) => {
         if (fields[field]) {
            queryClient.invalidateQueries({
               queryKey: [queryKey, fields[field]],
            });
         }
      });
   };

   return invalidate;
}
