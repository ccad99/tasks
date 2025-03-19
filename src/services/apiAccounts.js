import supabase from "./supabase";

/*
 *   Function - getAccounts()  -- Gets all accounts
 */

export async function getAccounts() {
   const { data, error } = await supabase.from("account").select("*");

   if (error) {
      console.error("Error fetching Accounts:", error.message);
      return []; // Return empty array instead of throwing an error
   }

   return data;
}

/*
 *   Function - getAccountsSorted()  -- Gets all accounts in pre-defined sort order
 */

export async function getAccountsSorted(sortBy = "name", order = "asc") {
   const { data, error } = await supabase
      .from("account")
      .select("*")
      .order(sortBy, { ascending: order === "asc" });

   if (error) {
      console.error("Error fetching Accounts:", error.message);
      return []; // Return empty array instead of throwing an error
   }

   return data;
}

/*
 *    Function - getAccount(custom_id)  -- Gets single account
 */

export async function getAccount(custom_id) {
   const { data, error } = await supabase
      .from("account")
      .select("*")
      .eq("custom_id", custom_id)
      .single();

   if (error) {
      console.error("Error fetching Account:", error.message);
      return null; // Return null for single record
   }

   return data;
}

/*
 *    Function - createAccount(newAcct)  -- Creates new account
 */

export async function createAccount(newAcct) {
   const { data, error } = await supabase
      .from("account")
      .insert([newAcct]) // Fix incorrect object nesting
      .select()
      .single(); // Ensure only one record is returned

   if (error) {
      console.error("Error creating Account:", error.message);
      return null;
   }

   return data;
}

/*
 *    Function - updateAccount(custom_id, obj)
 */

export async function updateAccount(custom_id, obj) {
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
      .from("account")
      .update(updateFields)
      .eq("custom_id", custom_id)
      .select()
      .single();

   if (error) {
      console.error("Error updating Account:", error.message);
      return null;
   }

   return data;
}
