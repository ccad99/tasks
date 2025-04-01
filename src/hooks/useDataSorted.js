// src/hooks/useDataSorted.js
import { useQuery } from "@tanstack/react-query";
import { getDataFromView } from "../services/apiData";

export function useDataSorted({
   table,
   view = null,
   sortBy = "name",
   order = "asc",
   filters = {},
}) {
   const queryKey = [table, view || `${table}_view`, sortBy, order, filters];

   const {
      data = [],
      isLoading,
      error,
   } = useQuery({
      queryKey,
      queryFn: () => getDataFromView({ table, view, sortBy, order, filters }),
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
   });

   return { data, isLoading, error };
}
