// src/components/objectives/useObjectives.js

import { useQuery } from "@tanstack/react-query";
import { getObjectives } from "../../services/apiObjectives";
import { useTableSort } from "../../hooks/useTableSort";

/**
 * Custom hook to fetch objectives + handle sorting
 */
export function useObjectives() {
   const {
      isLoading,
      data: objectives = [],
      error,
   } = useQuery({
      queryKey: ["objective"],
      queryFn: getObjectives,
      staleTime: 5 * 60 * 1000, // 5 minutes
   });

   // Reusable sort hook
   const { sortBy, order, sortedData, handleSort } = useTableSort(
      objectives,
      "name" // default sort by name
   );

   return {
      objectives: sortedData,
      isLoading,
      error,
      sortBy,
      order,
      handleSort,
   };
}
