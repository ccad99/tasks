import supabase from "./supabase";

/*
 *   Function - getContacts()  -- Gets all contacts
 */

export async function getContacts() {
   const { data, error } = await supabase.from("contact").select("*");

   if (error) {
      console.error("Error fetching Contacts:", error.message);
      return []; // Return empty array instead of throwing an error
   }
   console.log(data);
   return data;
}

/*
 *   Function - getContactsSorted()  -- Gets all contacts in pre-defined sort order
 */

export async function getContactsSorted(sortBy = "name", order = "asc") {
   const columnToSort = sortBy === "name" ? "name" : sortBy;

   const { data, error } = await supabase
      .from("contact")
      .select("*")
      .order(columnToSort, { ascending: order === "asc" });

   if (error) {
      console.error("Error fetching Contacts:", error.message);
      return []; // Return empty array instead of throwing an error
   }

   return data;
}

/*
 *    Function - getContact(custom_id)
 */

export async function getContact(custom_id) {
   const { data, error } = await supabase
      .from("contact")
      .select("*")
      .eq("custom_id", custom_id)
      .single();

   if (error) {
      console.error("Error fetching Contact:", error.message);
      return null; // Return null for single record
   }

   return data;
}

/*
 *    Function - createContact(newContact)
 */

export async function createContact(newContact) {
   const { data, error } = await supabase
      .from("contact")
      .insert([newContact]) // Fix incorrect object nesting
      .select()
      .single(); // Ensure only one record is returned

   if (error) {
      console.error("Error creating Contact:", error.message);
      return null;
   }

   return data;
}

/*
 *    Function - updateContact(custom_id, obj)
 */

export async function updateContact(custom_id, obj) {
   if (!custom_id || !obj || Object.keys(obj).length === 0) {
      console.error(
         "Invalid update request: Missing custom_id or update fields."
      );
      return null;
   }

   // Ensure we are only updating non-null values
   const updateFields = Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== undefined)
   );

   if (Object.keys(updateFields).length === 0) {
      console.warn("No valid fields to update.");
      return null;
   }

   // Execute update
   const { data, error } = await supabase
      .from("contact")
      .update(updateFields)
      .eq("custom_id", custom_id)
      .select()
      .single();

   if (error) {
      console.error("Error updating Contact:", error.message);
      return null;
   }

   return data;
}
