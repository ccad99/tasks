import React from "react";
import ViewRecordLayout from "../shared/ViewRecordLayout";

const ViewContactPage = ({ contactData }) => {
   return (
      <ViewRecordLayout
         title={`View Contact: ${contactData.firstName} ${contactData.lastName}`}
         headerContent={<button>Edit</button>}
         leftColumn={
            <div>
               <p>
                  <strong>Title:</strong> {contactData.title}
               </p>
               <p>
                  <strong>Email:</strong> {contactData.email}
               </p>
               <p>
                  <strong>Phone:</strong> {contactData.phone1}
               </p>
               <p>
                  <strong>Department:</strong> {contactData.department}
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
