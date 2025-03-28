// src/components/shared/RelatedTasksTable.jsx
import { Link } from "react-router-dom";
import { format } from "date-fns";
import styles from "./RelatedTasksTable.module.css";

function RelatedTasksTable({ tasks = [], isLoading, title = "Related Tasks" }) {
   if (isLoading) return <p>Loading tasks...</p>;
   if (!tasks.length) return <p>No related tasks found.</p>;

   return (
      <div className={styles.taskListContainer}>
         <h3>{title}</h3>
         <table className={styles.table}>
            <thead>
               <tr>
                  <th>Subject</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Assigned</th>
               </tr>
            </thead>
            <tbody>
               {tasks.map((task) => (
                  <tr key={task.custom_id}>
                     <td>
                        <Link
                           to={`/tasks/${task.custom_id}`}
                           className={styles.link}
                        >
                           {task.subject}
                        </Link>
                     </td>
                     <td>{format(new Date(task.due_date), "MM/dd/yyyy")}</td>
                     <td>{task.status}</td>
                     <td>{task.priority}</td>
                     <td>
                        {format(new Date(task.created_date), "MM/dd/yyyy")}
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default RelatedTasksTable;
