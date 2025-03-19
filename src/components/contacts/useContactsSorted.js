import { useQuery } from "@tanstack/react-query";
import { getContactsSorted } from "../../services/apiContacts";

export function useContactsSorted(sortBy = "name", order = "asc") {
   const {
      data: contacts = [], // Ensure data is named "contacts" and prevent undefined
      isLoading,
      error,
   } = useQuery({
      queryKey: ["contact", sortBy, order],
      queryFn: () => getContactsSorted(sortBy, order),
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
   });

   return { contacts, isLoading, error };
}
