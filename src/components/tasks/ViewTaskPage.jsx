import React from "react";
import { useParams } from "react-router-dom";
import ViewRecordLayout from "../shared/ViewRecordLayout";
import { useTask } from "./useTask";
import styles from "../shared/ViewRecordLayout.module.css";

const ViewTaskPage = () => {
   const { custom_id } = useParams();
   const { task, isLoading, error } = useTask(custom_id);

   console.log(`In View Task Page: ${custom_id}`);
   console.log(task);

   if (isLoading) return <p>Loading task...</p>;
   if (error) return <p>Error loading task: {error.message}</p>;
   if (!task) return <p>Task not found</p>;

   const formattedAddress = task.address ? task.address : "None Listed";

   return (
      <ViewRecordLayout
         title={`View Task: ${task.subject}`}
         headerContent={<button>Edit</button>}
         leftColumn={
            <div>
               <p>
                  <strong>Assigned To: </strong>
                  {task.assigned_to}
               </p>
               <p>
                  <strong>Task Subject: </strong>
                  {task.subject}
               </p>
               <p>
                  <strong>Due Date: </strong> {task.due_date}
               </p>
               <p>
                  <strong>Priority: </strong>
                  {task.priority}
               </p>
               <p>
                  <strong>Status: </strong> {task.status}
               </p>
               <p>
                  <strong>Completed Date: </strong> <p>Completed Date Here</p>>
               </p>
               <p>
                  <strong>Name: </strong> {task.who_id}
               </p>
               <p>
                  <strong>Related To: </strong>
                  {task.what_id}
               </p>
               <p>
                  <strong>Comments: </strong>
                  {task.description}
               </p>
            </div>
         }
         rightColumn={
            <div className={styles.sidebar}>
               <h3>Related Tasks</h3>
               <p>Tasks will be listed here...</p>
            </div>
         }
      />
   );
};

export default ViewTaskPage;
