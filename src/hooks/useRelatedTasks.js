// src/components/shared/useRelatedTasks.js
import { useQuery } from "@tanstack/react-query";
import supabase from "../services/supabase";

export function useRelatedTasks({ foreignKey, foreignKeyValue }) {
   return useQuery({
      queryKey: ["relatedTasks", foreignKey, foreignKeyValue],
      queryFn: async () => {
         const { data, error } = await supabase
            .from("task")
            .select("*")
            .eq(foreignKey, foreignKeyValue)
            .order("due_date", { ascending: true });

         if (error) throw new Error("Could not fetch related tasks.");
         return data;
      },
      enabled: !!foreignKey && !!foreignKeyValue,
      staleTime: 0,
      keepPreviousData: true,
   });
}
