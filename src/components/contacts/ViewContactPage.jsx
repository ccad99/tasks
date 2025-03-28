//src/components/contacts/ViewContactPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import ViewRecordLayout from "../shared/ViewRecordLayout";
import { useContact } from "./useContact";
import { getCurrentUser } from "../../services/apiAuth";
import { useRelatedTasks } from "../../hooks/useRelatedTasks";
import RelatedTasksTable from "../shared/RelatedTasksTable";
import SharedModal from "../Shared/SharedModal";
import ContactForm from "./ContactForm";
import Spinner from "../../ui/Spinner";
import { format } from "date-fns";
import styles from "../shared/ViewRecordLayout.module.css";

const ViewContactPage = () => {
   const queryClient = useQueryClient();
   const { custom_id } = useParams();
   const { contact, isLoading, error } = useContact(custom_id);

   console.log(`In View Contact Page: ${custom_id}`);
   console.log(contact);

   const { data: tasks, isLoading: isLoadingTasks } = useRelatedTasks({
      foreignKey: "who_id",
      foreignKeyValue: contact?.custom_id,
   });

   console.log(`Related Tasks retrieved`);
   console.log(tasks);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedContact, setSelectedContact] = useState(null);

   //warm the cache
   useEffect(() => {
      const warmCache = async () => {
         const cached = queryClient.getQueryData(["user"]);
         if (!cached) {
            const user = await getCurrentUser();
            if (user) queryClient.setQueryData(["user"], user);
         }
      };
      warmCache();
   }, [queryClient]);

   if (isLoading)
      return (
         <div style={{ minHeight: "300px" }}>
            <Spinner useAlt />
         </div>
      );
   if (error) return <p>Error loading contact: {error.message}</p>;
   if (!contact) return <p>Contact not found</p>;

   const handleEdit = () => {
      setSelectedContact(contact); // set the currently loaded contact
      setIsModalOpen(true); // open the modal
   };

   return (
      <>
         <ViewRecordLayout
            title={`View Contact: ${contact.firstname} ${contact.lastname}`}
            headerContent={<button onClick={handleEdit}>Edit</button>}
            leftColumn={
               <div>
                  <p>
                     <strong>Name:</strong> {contact.name}
                  </p>
                  <p>
                     <strong>Title:</strong> {contact.title}
                  </p>
                  <p>
                     <strong>Email:</strong> {contact.email}
                  </p>
                  <p>
                     <strong>Phone:</strong> {contact.phone1}
                  </p>
                  <p>
                     <strong>Alt. Phone:</strong> {contact.phone2}
                  </p>
                  <p>
                     <strong>Department:</strong> {contact.department}
                  </p>
                  <p>
                     <strong>Comments: </strong>
                     {contact.description}
                  </p>
               </div>
            }
            rightColumn={
               <RelatedTasksTable
                  tasks={tasks}
                  isLoading={isLoadingTasks}
                  title="Tasks related to this Contact"
               />
            }
         />
         {isModalOpen && (
            <SharedModal
               isOpen={isModalOpen}
               onClose={() => setIsModalOpen(false)}
            >
               <ContactForm
                  contact={selectedContact}
                  onClose={() => setIsModalOpen(false)}
                  onSuccess={() => {
                     // 👇 Invalidate task query to refetch the updated record
                     queryClient.invalidateQueries({
                        queryKey: ["contact", custom_id],
                     });
                     setIsModalOpen(false);
                  }}
               />
            </SharedModal>
         )}
      </>
   );
};

export default ViewContactPage;
