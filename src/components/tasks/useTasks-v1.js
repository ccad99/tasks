import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTasks } from "../../services/apiTasks";
// import { useSearchParams } from "react-router-dom";
// import { PAGE_SIZE } from "../../utils/constants";

export function useTasks() {
   const queryClient = useQueryClient();
   const [searchParams] = useSearchParams();

   // // FILTER

   //const filterValue = searchParams.get("status");

   // SET UP the FILTER OBJECT THAT WILL BE PASSED TO getBookings
   // const filter =
   //    !filterValue || filterValue === "all"
   //       ? { field: "status", method: "eq", value: "all" }
   //       : { field: "status", method: "eq", value: filterValue };

   //  SORT

   // const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
   // const [field, direction] = sortByRaw.split("-");
   // const sortBy = { field, direction };

   //  PAGINATION
   //
   // const page = !searchParams.get("page")
   //    ? 1
   //    : Number(searchParams.get("page"));

   // DATA LOADING QUERY HERE
   //
   // const {
   //    isLoading,
   //    data: { data: tasks, count } = {},
   //    error,
   // } = useQuery({
   //    queryKey: ["tasks", filter, sortBy, page],
   //    queryFn: () => getBookings({ filter, sortBy, page }),
   // });

   const { isLoading, data, error } = useQuery({
      queryKey: ["tasks"],
      queryFn: () => getTasks(),
   });

   //  PRE-FETCH DATA CODE
   //
   // We are getting the data for the next page so use "page + 1"

   // const pageCount = Math.ceil(count / PAGE_SIZE);

   // if (page < pageCount)
   //    queryClient.prefetchQuery({
   //       queryKey: ["bookings", filter, sortBy, page + 1],
   //       queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
   //    });

   // if (page > 1)
   //    queryClient.prefetchQuery({
   //       queryKey: ["bookings", filter, sortBy, page - 1],
   //       queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
   //    });

   //  RETURN DATA

   return tasks;
}
