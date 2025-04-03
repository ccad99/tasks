import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import ViewRecordLayout from "../shared/ViewRecordLayout";
import { useObjective } from "./useObjective";
import { getCurrentUser } from "../../services/apiAuth";
import SharedModal from "../Shared/SharedModal";
import ObjectiveForm from "./ObjectiveForm";
import Spinner from "../../ui/Spinner";
import styles from "../shared/ViewRecordLayout.module.css";

const ViewObjectivePage = () => {
  const queryClient = useQueryClient();
  const { custom_id } = useParams();
  const { objective, isLoading, error } = useObjective(custom_id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedObjective, setSelectedObjective] = useState(null);

  // console.log(`In View Objective Page: ${custom_id}`);
  // console.log(objective);

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

  // if (isLoading) return <p>Loading objective...</p>;
  if (isLoading)
    return (
      <div style={{ minHeight: "300px" }}>
        <Spinner useAlt />
      </div>
    );

  if (error) return <p>Error loading objective: {error.message}</p>;
  if (!objective) return <p>Objective not found</p>;

  const handleEdit = () => {
    setSelectedObjective(objective); // set the currently loaded objective
    setIsModalOpen(true); // open the modal
  };

  return (
    <>
      <ViewRecordLayout
        title={`View Objective: ${objective.name}`}
        headerContent={<button onClick={handleEdit}>Edit</button>}
        leftColumn={
          <div>
            <p>
              <strong>Objective Owner: </strong>
              {objective.owner_id}
            </p>
            <p>
              <strong>Objective Title: </strong>
              {objective.name}
            </p>
            <p>
              <strong>Due Date: </strong> {objective.due_date}
            </p>
            <p>
              <strong>Priority: </strong>
              {objective.priority}
            </p>
            <p>
              <strong>Status: </strong> {objective.status}
            </p>
            <p>
              <strong>Completed Date: </strong>{" "}
              {objective.date_completed
                ? format(new Date(objective.completed_date), "PPPpp") // Customize format as needed
                : "Not Completed"}
            </p>
            {/* <p>
              <strong>Name: </strong> {objective.who_id}
            </p>
            <p>
              <strong>Related To: </strong>
              {objective.what_id}
            </p> */}
            <p>
              <strong>Comments: </strong>
              {objective.description}
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
        <SharedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ObjectiveForm
            objective={selectedObjective}
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => {
              // 👇 Invalidate objective query to refetch the updated record
              queryClient.invalidateQueries({
                queryKey: ["objective", custom_id],
              });
              setIsModalOpen(false);
            }}
          />
        </SharedModal>
      )}
    </>
  );
};

export default ViewObjectivePage;
