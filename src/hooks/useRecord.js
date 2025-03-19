import { useQuery } from "@tanstack/react-query";
import { getRecord } from "../../services/apiRecords";

export function useRecord(recordType, custom_id) {
   const { data, isLoading, error } = useQuery({
      queryKey: [recordType, custom_id],
      queryFn: () => getRecord(recordType, custom_id),
   });

   return { data, isLoading, error };
}
