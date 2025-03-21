import React, { useState } from "react";
import TaskHeader from "../components/Tasks/TaskHeader";
import TaskTable from "../components/Tasks/TaskTable";
import { useTasksSorted } from "../components/Tasks/useTasksSorted";

function TaskPage() {
   const [sortBy, setSortBy] = useState("subject"); // Default column
   const [order, setOrder] = useState("asc"); // Default order

   const { tasks, isLoading, error } = useTasksSorted(sortBy, order);

   if (isLoading) return <p>Loading tasks...</p>;
   if (error) return <p>Error loading tasks: {error.message}</p>;

   // Function to update sorting and trigger refetch
   const handleSort = (column) => {
      setOrder((prevOrder) =>
         sortBy === column && prevOrder === "asc" ? "desc" : "asc"
      );
      setSortBy(column);
   };

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
            count={tasks.length}
            sortBy={sortBy}
            order={order}
         />
         <TaskTable
            tasks={tasks}
            sortBy={sortBy}
            order={order}
            handleSort={handleSort}
         />
      </div>
   );
}

export default TaskPage;
