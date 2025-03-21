import supabase from "./supabase";

/*
 *   Function - getTasks()  -- Gets all accounts
 */

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
 *   Function - getTasksSorted()  -- Gets all tasks in pre-defined sort order
 */

export async function getTasksSorted(sortBy = "subject", order = "asc") {
   const { data, error } = await supabase
      .from("task")
      .select("*")
      .order(sortBy, { ascending: order === "asc" });

   if (error) {
      console.error("Error fetching Tasks:", error.message);
      return []; // Return empty array instead of throwing an error
   }

   return data;
}

/*
 *   Function - getTasks -- query to query the view instead of the table
 */

// export async function getTasksSorted(sortBy = "created_date", order = "asc") {
//    const { data, error } = await supabase
//       .from("task_view")
//       .select("*")
//       .order(sortBy, { ascending: order === "asc" });

//    if (error) {
//       console.error("Error fetching sorted tasks:", error.message);
//       return [];
//    }

//    return data;
// }

/*
 *    Function - getTasksFiltered  -- queries the View to get filtered tasks
 */

// export async function getTasksFiltered(filters = {}) {
//    let query = supabase.from("task_view").select("*");

//    if (filters.status) {
//       query = query.eq("status", filters.status);
//    }
//    if (filters.priority) {
//       query = query.eq("priority", filters.priority);
//    }
//    if (filters.assignedTo) {
//       query = query.eq("assigned_to_name", filters.assignedTo);
//    }

//    const { data, error } = await query;

//    if (error) {
//       console.error("Error fetching filtered tasks:", error.message);
//       return [];
//    }

//    return data;
// }

/*
 *    Function - getTasksFromView  -- queries the View to get filtered tasks
 *    passing sortBy, order, and filters with defaults set
 */

export async function getTasksFromView({
   sortBy = "subject",
   order = "asc",
   filters = {},
}) {
   let query = supabase.from("task_view").select("*");

   // 1. Apply Filters
   // Example: if filters = { status: "In Progress", assignedToName: "John Smith" }
   // You can extend this logic as needed.
   if (filters.status) {
      query = query.eq("status", filters.status);
   }
   if (filters.assignedToName) {
      query = query.eq("assigned_to_name", filters.assignedToName);
   }
   // ... add more filters as needed

   // 2. Apply Sorting
   // Convert order ('asc'/'desc') to boolean for ascending
   const ascending = order === "asc";
   query = query.order(sortBy, { ascending });

   // 3. Execute Query
   const { data, error } = await query;
   if (error) {
      console.error("Error fetching tasks:", error.message);
      return [];
   }

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
