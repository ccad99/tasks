import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getContacts } from "../../services/apiContacts";

export function useContacts() {
   const queryClient = useQueryClient();

   const {
      isLoading,
      data: contacts = [], // Default to an empty array to prevent undefined issues
      error,
   } = useQuery({
      queryKey: ["contact"],
      queryFn: getContacts, // No need to wrap it in an arrow function
      staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
   });

   return { contacts, isLoading, error };
}
