import { useQuery } from "@tanstack/react-query";
import { getContact } from "../../services/apiContacts";

export function useContact(custom_id) {
   const {
      isLoading,
      data: contact,
      error,
   } = useQuery({
      queryKey: ["contact", custom_id],
      queryFn: () => getContact(custom_id),
      retry: false,
   });

   return { isLoading, error, contact };
}
