//src/components/accounts/ViewAccountPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import ViewRecordLayout from "../shared/ViewRecordLayout";
import { useAccount } from "./useAccount";
import { getCurrentUser } from "../../services/apiAuth";
import { useRelatedTasks } from "../../hooks/useRelatedTasks";
import RelatedTasksTable from "../shared/RelatedTasksTable";
import SharedModal from "../Shared/SharedModal";
import AccountForm from "./AccountForm";
import Spinner from "../../ui/Spinner";
import styles from "../shared/ViewRecordLayout.module.css";

const ViewAccountPage = () => {
   const queryClient = useQueryClient();
   const { custom_id } = useParams();
   const { account, isLoading, error } = useAccount(custom_id);

   console.log(`In View Account Page: ${custom_id}`);
   console.log(account);

   const { data: tasks, isLoading: isLoadingTasks } = useRelatedTasks({
      foreignKey: "what_id",
      foreignKeyValue: account?.custom_id,
   });

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedAccount, setSelectedAccount] = useState(null);

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

   if (error) return <p>Error loading account: {error.message}</p>;
   if (!account) return <p>Account not found</p>;

   const formattedAddress = account.address ? account.address : "None Listed";

   const handleEdit = () => {
      setSelectedAccount(account); // set the currently loaded account
      setIsModalOpen(true); // open the modal
   };

   return (
      <>
         <ViewRecordLayout
            title={`View Account: ${account.name}`}
            headerContent={<button onClick={handleEdit}>Edit</button>}
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
                     <strong>Alt. Phone: </strong> {account.phone2}
                  </p>
                  <p>
                     <strong>Website: </strong> {account.website}
                  </p>
                  <p>
                     <strong>Address: </strong>
                     {formattedAddress}
                  </p>
                  <p>
                     <strong>Comments: </strong>
                     {account.description}
                  </p>
               </div>
            }
            rightColumn={
               <RelatedTasksTable
                  tasks={tasks}
                  isLoading={isLoadingTasks}
                  title="Tasks related to this Account"
               />
            }
         />
         {isModalOpen && (
            <SharedModal
               isOpen={isModalOpen}
               onClose={() => setIsModalOpen(false)}
            >
               <AccountForm
                  account={selectedAccount}
                  onClose={() => setIsModalOpen(false)}
                  onSuccess={() => {
                     // 👇 Invalidate task query to refetch the updated record
                     queryClient.invalidateQueries({
                        queryKey: ["account", custom_id],
                     });
                     setIsModalOpen(false);
                  }}
               />
            </SharedModal>
         )}
      </>
   );
};

export default ViewAccountPage;
