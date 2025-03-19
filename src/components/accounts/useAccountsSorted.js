import { useQuery } from "@tanstack/react-query";
import { getAccountsSorted } from "../../services/apiAccounts";

export function useAccountsSorted(sortBy = "name", order = "asc") {
   const {
      data: accounts = [], // Ensure data is named "accounts" and prevent undefined
      isLoading,
      error,
   } = useQuery({
      queryKey: ["account", sortBy, order],
      queryFn: () => getAccountsSorted(sortBy, order),
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
   });

   return { accounts, isLoading, error };
}
