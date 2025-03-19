import React, { useState } from "react";
import TaskHeader from "../components/Tasks/TaskHeader";
import TaskTable from "../components/Tasks/TaskTable";

function TaskPage() {
   const [tasks, setTasks] = useState([
      { id: 1, subject: "Follow up call", status: "open" },
      { id: 2, subject: "Email response", status: "completed" },
   ]);

   const handleSearch = (query) => {
      console.log("Searching for:", query);
   };

   const handleFilterChange = (filter) => {
      console.log("Filtering by:", filter);
   };

   return (
      <div>
         <TaskHeader
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            taskCount={tasks.length}
         />
         <TaskTable />
      </div>
   );
}

export default TaskPage;
