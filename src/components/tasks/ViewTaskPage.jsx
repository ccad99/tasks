import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import ViewRecordLayout from "../shared/ViewRecordLayout";
import { useTask } from "./useTask";
import SharedModal from "../Shared/SharedModal";
import TaskForm from "./TaskForm";
import styles from "../shared/ViewRecordLayout.module.css";

const ViewTaskPage = () => {
   const queryClient = useQueryClient();
   const { custom_id } = useParams();
   const { task, isLoading, error } = useTask(custom_id);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedTask, setSelectedTask] = useState(null);

   // console.log(`In View Task Page: ${custom_id}`);
   // console.log(task);

   // warm the cache
   useEffect(() => {
      const checkUser = async () => {
         const cached = queryClient.getQueryData(["user"]);
         if (!cached) {
            const user = await getCurrentUser();
            if (user) queryClient.setQueryData(["user"], user);
         }
      };
      checkUser();
   }, []);

   if (isLoading) return <p>Loading task...</p>;
   if (error) return <p>Error loading task: {error.message}</p>;
   if (!task) return <p>Task not found</p>;

   const handleEdit = () => {
      setSelectedTask(task); // set the currently loaded task
      setIsModalOpen(true); // open the modal
   };

   return (
      <>
         <ViewRecordLayout
            title={`View Task: ${task.subject}`}
            headerContent={<button onClick={handleEdit}>Edit</button>}
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
                     <strong>Completed Date: </strong>{" "}
                     {task.date_completed
                        ? format(new Date(task.completed_date), "PPPpp") // Customize format as needed
                        : "Not Completed"}
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
         {isModalOpen && (
            <SharedModal
               isOpen={isModalOpen}
               onClose={() => setIsModalOpen(false)}
            >
               <TaskForm
                  task={selectedTask}
                  onClose={() => setIsModalOpen(false)}
                  onSuccess={() => {
                     // 👇 Invalidate task query to refetch the updated record
                     queryClient.invalidateQueries({
                        queryKey: ["task", custom_id],
                     });
                     setIsModalOpen(false);
                  }}
               />
            </SharedModal>
         )}
      </>
   );
};

export default ViewTaskPage;
