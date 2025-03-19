import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "../../services/apiBookings.js";
import toast from "react-hot-toast";

export function useCreateBooking() {
   const queryClient = useQueryClient();

   const { mutate: createBooking, isLoading: isCreating } = useMutation({
      mutationFn: (newBooking) => createBookingApi(newBooking),
      onSuccess: () => {
         toast.success("Booking successfully created");
         queryClient.invalidateQueries({
            queryKey: ["bookings"],
         });
      },
      onError: (err) => toast.error(err.message),
   });

   return { isCreating, createBooking };
}
