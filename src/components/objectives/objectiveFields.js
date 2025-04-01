export const objectiveFields = [
   { name: "name", label: "Objective Name", type: "text", required: true },
   { name: "description", label: "Description", type: "textarea" },
   { name: "goal_id", label: "Goal", type: "goalLookup" }, // later you'll implement <GoalLookup />
   { name: "owner_id", label: "Owner", type: "userLookup" },
   {
      name: "related_account_id",
      label: "Related Account",
      type: "accountLookup",
   },
   { name: "start_date", label: "Start Date", type: "date" },
   { name: "due_date", label: "Due Date", type: "date" },
   { name: "completed_date", label: "Completed Date", type: "date" },
   { name: "status", label: "Status", type: "text" },
   { name: "priority", label: "Priority", type: "text" },
   {
      name: "percent_complete",
      label: "Percent Complete",
      type: "number",
      min: 0,
      max: 100,
   },
   {
      name: "is_visible_to_tf_members",
      label: "Visible to TF Members",
      type: "checkbox",
   },
   { name: "objective_type", label: "Objective Type", type: "text" },
   { name: "category", label: "Category", type: "text" },
   { name: "notes", label: "Notes", type: "textarea" },
];
