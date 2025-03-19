import supabase from "./supabase";

export async function getTasks() {
   const { data, error } = await supabase.from("task").select("*");

   if (error) {
      console.error("Error fetching tasks:", error.message);
      return []; // Return empty array instead of throwing an error
   }
   console.log(data);
   return data;
}

/*
 *    Function - getTask(custom_id)
 */

export async function getTask(custom_id) {
   const { data, error } = await supabase
      .from("task")
      .select("*")
      .eq("custom_id", custom_id)
      .single();

   if (error) {
      console.error("Error fetching task:", error.message);
      return null; // Return null for single record
   }

   return data;
}

/*
 *    Function - createTask(newTask)
 */

export async function createTask(newTask) {
   const { data, error } = await supabase
      .from("task")
      .insert([newTask]) // Fix incorrect object nesting
      .select()
      .single(); // Ensure only one record is returned

   if (error) {
      console.error("Error creating task:", error.message);
      return null;
   }

   return data;
}

/*
 *    Function - updateTask(custom_id, obj)
 */

export async function updateTask(custom_id, obj) {
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
      .from("task")
      .update(updateFields)
      .eq("custom_id", custom_id)
      .select()
      .single();

   if (error) {
      console.error("Error updating task:", error.message);
      return null;
   }

   return data;
}
