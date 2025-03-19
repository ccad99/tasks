import React from "react";
import { useTasks } from "./useTasks";
import styles from "./TaskTable.module.css";

const TaskTable = () => {
   const { tasks, isLoading, error } = useTasks();

   if (isLoading) return <p>Loading tasks...</p>;
   if (error) return <p>Error loading tasks: {error.message}</p>;

   return (
      <div className={styles.taskTableContainer}>
         <table className={styles.taskTable}>
            <thead>
               <tr>
                  <th>Task Id</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Due Date</th>
               </tr>
            </thead>
            <tbody>
               {tasks.map((task) => (
                  <tr key={task.custom_id}>
                     <td>{task.custom_id}</td>
                     <td>{task.subject}</td>
                     <td>{task.status}</td>
                     <td>{task.priority}</td>
                     <td>{task.due_date}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default TaskTable;
