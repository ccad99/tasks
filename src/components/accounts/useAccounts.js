/*
 *   Custom hook to get array of accounts. Can call getAccounts or
 *   getSortedAccounts
 */

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAccounts } from "../../services/apiAccounts";

export function useAccounts() {
   const queryClient = useQueryClient();

   const {
      isLoading,
      data: accounts = [], // Default to an empty array to prevent undefined issues
      error,
   } = useQuery({
      queryKey: ["account"],
      queryFn: getAccounts, // No need to wrap it in an arrow function
      staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
   });

   return { accounts, isLoading, error };
}
