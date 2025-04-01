// Step 5 — useTableData.js (shared)

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useTableData({
   queryKey,
   fetchFn,
   initialSort = { by: "name", order: "asc" },
}) {
   const [sortBy, setSortBy] = useState(initialSort.by);
   const [order, setOrder] = useState(initialSort.order);

   const handleSort = (column) => {
      if (sortBy === column)
         setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      else {
         setSortBy(column);
         setOrder("asc");
      }
   };

   const {
      data = [],
      isLoading,
      error,
   } = useQuery({
      queryKey: [queryKey, sortBy, order],
      queryFn: () => fetchFn({ sortBy, order }),
   });

   return { data, sortBy, order, handleSort, isLoading, error };
}
