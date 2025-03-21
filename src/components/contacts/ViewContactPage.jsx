import React from "react";
import { useParams } from "react-router-dom";
import ViewRecordLayout from "../shared/ViewRecordLayout";
import { useContact } from "./useContact";

const ViewContactPage = () => {
   const { custom_id } = useParams();
   const { contact, isLoading, error } = useContact(custom_id);

   console.log(`In View Contact Page: ${custom_id}`);
   console.log(contact);

   if (isLoading) return <p>Loading contact...</p>;
   if (error) return <p>Error loading contact: {error.message}</p>;
   if (!contact) return <p>Contact not found</p>;

   return (
      <ViewRecordLayout
         title={`View Contact: ${contact.firstname} ${contact.lastname}`}
         headerContent={<button>Edit</button>}
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
                  <strong>Department:</strong> {contact.department}
               </p>
            </div>
         }
         rightColumn={
            <div>
               <h3>Related Activities</h3>
               <p>Notes, calls, and meetings will be listed here...</p>
            </div>
         }
      />
   );
};

export default ViewContactPage;
