// src/services/apiData.js
import supabase from "./supabase";

/*
 * Get records from a table or view with optional sorting and filters
 */
export async function getDataFromView({
   table,
   view = null,
   sortBy = "name",
   order = "asc",
   filters = {},
}) {
   const source = view || `${table}_view`; // default to `${table}_view` if view is not provided

   let query = supabase.from(source).select("*");

   // Apply filters dynamically
   for (const [field, value] of Object.entries(filters)) {
      query = query.eq(field, value);
   }

   // Sorting
   const ascending = order === "asc";
   query = query.order(sortBy, { ascending });

   const { data, error } = await query;

   if (error) {
      console.error(`Error fetching data from ${source}:`, error.message);
      return [];
   }

   return data;
}

/*
 * Create record in any table
 */
export async function createData(table, newRecord) {
   const { data, error } = await supabase
      .from(table)
      .insert([newRecord])
      .select()
      .single();

   if (error) {
      console.error(`Error creating record in ${table}:`, error.message);
      return null;
   }

   return data;
}

/*
 * Update record in any table
 */
export async function updateData(table, custom_id, updateFields) {
   if (!custom_id || !updateFields || Object.keys(updateFields).length === 0) {
      console.error(
         "Invalid update request: Missing custom_id or update fields."
      );
      return null;
   }

   const cleanedFields = Object.fromEntries(
      Object.entries(updateFields).filter(([_, value]) => value !== undefined)
   );

   if (Object.keys(cleanedFields).length === 0) {
      console.warn("No valid fields to update.");
      return null;
   }

   const { data, error } = await supabase
      .from(table)
      .update(cleanedFields)
      .eq("custom_id", custom_id)
      .select()
      .single();

   if (error) {
      console.error(`Error updating record in ${table}:`, error.message);
      return null;
   }

   return data;
}
