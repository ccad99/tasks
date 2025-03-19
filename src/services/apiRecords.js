import supabase from "./supabase";

export async function getRecord(recordType, custom_id) {
   const { data, error } = await supabase
      .from(recordType === "account" ? "accounts" : "contacts")
      .select("*")
      .eq("custom_id", custom_id)
      .single();

   if (error) {
      console.error(`Error fetching ${recordType}:`, error.message);
      return null;
   }
   return data;
}
