import React from "react";
import styles from "./TasksTable.module.css";

const TaskTable = () => {
   return (
      <div className="task-table-container">
         <table className="task-table">
            <thead>
               <tr>
                  <th>Subject</th>
                  <th>Name</th>
                  <th>Related To</th>
                  <th>Due Date</th>
                  <th>Assigned Alias</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>Follow up call</td>
                  <td>John Doe</td>
                  <td>Acme Corp</td>
                  <td>2025-03-10</td>
                  <td>JDoe</td>
               </tr>
               <tr>
                  <td>Email response</td>
                  <td>Jane Smith</td>
                  <td>Beta Inc</td>
                  <td>2025-03-11</td>
                  <td>JSmith</td>
               </tr>
               {/* More rows can be added dynamically */}
            </tbody>
         </table>
      </div>
   );
};

export default TaskTable;
