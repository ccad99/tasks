import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings-v1-clientSideFiltering";
import { getBookingsFiltered } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
   // const [searchParams] = useSearchParams();

   // // FILTER

   // const filterValue = searchParams.get("status");

   // // SET UP the FILTER OBJECT THAT WILL BE PASSED TO getBookings
   // const filter = !filterValue || filterValue === 'all' ? null : { fields: 'status', value: filterValue }

   // let filteredBookings;

   // switch (filterValue) {
   //    case "all":
   //       filteredBookings = bookings;
   //       break;
   //    case "unconfirmed":
   //       filteredBookings = bookings.filter(
   //          (booking) => booking.status === "unconfirmed"
   //       );
   //       break;
   //    case "checked-in":
   //       filteredBookings = bookings.filter(
   //          (booking) => booking.status === "checked-in"
   //       );
   //       break;
   //    case "checked-out":
   //       filteredBookings = bookings.filter(
   //          (booking) => booking.status === "checked-out"
   //       );
   //       break;
   //    default:
   //       filteredBookings = bookings;
   // }

   // const {
   //    isLoading,
   //    data: bookings,
   //    error,
   // } = useQuery({
   //    queryKey: ["bookings", filter],
   //    queryFn: () => getBookings({ filter }),
   // });

   const {
      isLoading,
      data: bookings,
      error,
   } = useQuery({
      queryKey: ["bookings"],
      queryFn: getBookings,
   });

   return { isLoading, error, bookings };
}
