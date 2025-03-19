import React from "react";
import { useParams } from "react-router-dom";
import ViewRecordLayout from "../shared/ViewRecordLayout";
import { useAccount } from "./useAccount";
import styles from "../shared/ViewRecordLayout.module.css";

const ViewAccountPage = () => {
   const { custom_id } = useParams();
   const { account, isLoading, error } = useAccount(custom_id);

   console.log(`In View Account Page: ${custom_id}`);
   console.log(account);

   if (isLoading) return <p>Loading account...</p>;
   if (error) return <p>Error loading account: {error.message}</p>;
   if (!account) return <p>Account not found</p>;

   const formattedAddress = account.address ? account.address : "None Listed";

   return (
      <ViewRecordLayout
         title={`View Account: ${account.name}`}
         headerContent={<button>Edit</button>}
         leftColumn={
            <div>
               <p>
                  <strong>Account Name: </strong>
                  {account.name}
               </p>
               <p>
                  <strong>Account Number: </strong> {account.account_num}
               </p>
               <p>
                  <strong>Type: </strong>
                  {account.type}
               </p>
               <p>
                  <strong>Industry: </strong> {account.industry}
               </p>
               <p>
                  <strong>Phone: </strong> {account.phone1}
               </p>
               <p>
                  <strong>Website: </strong> {account.website}
               </p>
               <p>
                  <strong>Address: </strong>
                  {formattedAddress}
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

export default ViewAccountPage;
