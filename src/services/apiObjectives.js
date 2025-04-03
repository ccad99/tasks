// src/services/apiObjectives.js

import supabase from "./supabase";

/* -------------------------
   Get ALL Objectives
------------------------- */
export async function getObjectives() {
  const { data, error } = await supabase.from("objective").select("*");

  if (error) {
    console.error("Error fetching objectives:", error.message);
    return [];
  }
  return data;
}

/* -------------------------
   Get Objectives (sorted)
------------------------- */
export async function getObjectivesSorted(sortBy = "name", order = "asc") {
  const { data, error } = await supabase
    .from("objective")
    .select("*")
    .order(sortBy, { ascending: order === "asc" });

  if (error) {
    console.error("Error fetching objectives (sorted):", error.message);
    return [];
  }

  return data;
}

/* -------------------------
   Get Objective (by custom_id)
------------------------- */
export async function getObjective(custom_id) {
  const { data, error } = await supabase
    .from("objective")
    .select("*")
    .eq("custom_id", custom_id)
    .single();

  if (error) {
    console.error("Error fetching objective:", error.message);
    return null;
  }

  return data;
}

/* -------------------------
   Create Objective
------------------------- */
export async function createObjective(newObjective) {
  const { data, error } = await supabase
    .from("objective")
    .insert([newObjective])
    .select()
    .single();

  if (error) {
    console.error("Error creating objective:", error.message);
    return null;
  }

  return data;
}

/* -------------------------
   Update Objective
------------------------- */
export async function updateObjective(custom_id, obj) {
  if (!custom_id || !obj || Object.keys(obj).length === 0) {
    console.error(
      "Invalid update request: Missing custom_id or update fields."
    );
    return null;
  }

  const updateFields = Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  );

  if (Object.keys(updateFields).length === 0) {
    console.warn("No valid fields to update.");
    return null;
  }

  const { data, error } = await supabase
    .from("objective")
    .update(updateFields)
    .eq("custom_id", custom_id)
    .select()
    .single();

  if (error) {
    console.error("Error updating objective:", error.message);
    return null;
  }

  return data;
}
