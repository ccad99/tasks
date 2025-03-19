import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

/*
 *    Function - getBookings
 */

export async function getBookings({ filter, sortBy, page }) {
   let query = supabase
      .from("bookings")
      .select(
         "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
         { count: "exact" }
      );

   // FILTER
   //
   let compare;

   if (filter && filter.value !== "all") {
      if (filter.method) {
         compare = filter.method;
      } else compare = "eq";
      query = query[compare](filter.field, filter.value);
   }

   const { data, error, count } = await query;

   if (error) {
      console.log(error);
      throw new Error("Bookings could not be loaded");
   }

   // PAGINATION

   if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = count > PAGE_SIZE ? from + PAGE_SIZE - 1 : count;
      query = query.range(from, to);
   }

   return { data, count };
}

/*
 *    Function - getBooking(id)
 */

export async function getBooking(id) {
   const { data, error } = await supabase
      .from("bookings")
      // .select(
      //    "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)"
      // )
      .select("*, cabins(*), guests(*)")
      .eq("id", id)
      .single();

   if (error) {
      console.error(error);
      throw new Error("Booking not found");
   }

   return data;
}

/*
 *    Function - getBookingsAfterDate(date) - tracks sales
 */

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// Date must be passed in as an ISO string
export async function getBookingsAfterDate(date) {
   const { data, error } = await supabase
      .from("bookings")
      .select("created_at, totalPrice, extrasPrice")
      .gte("created_at", date)
      .lte("created_at", getToday({ end: true }));

   if (error) {
      console.error(error);
      throw new Error("Bookings could not get loaded");
   }

   return data;
}

/*
 *    Function - getStaysAfterDate - tracks stays
 */

// Returns all STAYS that are were created after the given date
// Date must be passed in as an ISO string
export async function getStaysAfterDate(date) {
   const { data, error } = await supabase
      .from("bookings")
      .select("*, guests(fullName)")
      .gte("startDate", date)
      .lte("startDate", getToday());

   if (error) {
      console.error(error);
      throw new Error("Bookings could not get loaded");
   }

   return data;
}

/*
 *    Function - getStaysTodayActivity  
 */

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
   const { data, error } = await supabase
      .from("bookings")
      .select("*, guests(fullName, nationality, countryFlag)")
      .or(
         `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
      )
      .order("created_at");

   // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
   // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
   // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

   if (error) {
      console.error(error);
      throw new Error("Bookings could not get loaded");
   }
   return data;
}

/*
 *    Function - createBooking(newBooking)
 */

export async function createBooking(newBooking) {
   //1. create Booking

   let query = supabase.from("bookings").insert([{ newBooking }]);

   const { data, error } = await query.select().single();

   if (error) {
      console.log(error);
      throw new Error("Booking could not be created");
   }

   return data;
}

/*
 *    Function - updateBooking(id)
 */

export async function updateBooking(id, obj) {
   const { data, error } = await supabase
      .from("bookings")
      .update(obj)
      .eq("id", id)
      .select()
      .single();

   if (error) {
      console.error(error);
      throw new Error("Booking could not be updated");
   }
   return data;
}

/*
 *    Function - deleteBooking(id)
 */

export async function deleteBooking(id) {
   // REMEMBER RLS POLICIES
   const { data, error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

   if (error) {
      console.error(error);
      throw new Error("Booking could not be deleted");
   }
   return data;
}
