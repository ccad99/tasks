import { useQuery } from "@tanstack/react-query";
import { getAccount } from "../../services/apiAccounts";

export function useAccount(custom_id) {
   // console.log("In useAccount hook");
   // console.log(`custom_id: ${custom_id}`);

   const {
      isLoading,
      data: account,
      error,
   } = useQuery({
      // queryKey: ["accounts", acctId],
      queryKey: ["account", custom_id],
      // queryFn: () => getAccount(acctId),
      queryFn: () => getAccount(custom_id),
      retry: false,
   });

   return { isLoading, error, account };
}
