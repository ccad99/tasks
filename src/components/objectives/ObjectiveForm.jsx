// src/pages/ObjectiveForm.jsx

import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import SharedModal from "../Shared/SharedModal";
import { useSave } from "../../hooks/useSave";
import { UserLookup, AccountLookup } from "../shared/lookups/lookups";
import DateInput from "../shared/dates/DateInput";
import styles from "./ObjectiveForm.module.css";

function ObjectiveForm({ onClose, onSuccess, objective: initialObjective }) {
   const queryClient = useQueryClient();
   const [objective] = useState(initialObjective);
   const isEditing = !!initialObjective;
   const saveAndNewRef = useRef(false);

   // ✅ Unified save hook
   const { save, isCreating, isUpdating } = useSave({
      resourceName: "Objective",
   });

   const formik = useFormik({
      validateOnChange: false,
      validateOnBlur: true,
      initialValues: {
         name: objective?.name || "",
         description: objective?.description || "",
         goal_id: objective?.goal_id || "",
         owner_id: objective?.owner_id || "",
         related_account_id: objective?.related_account_id || "",
         start_date: objective?.start_date || "",
         due_date: objective?.due_date || "",
         completed_date: objective?.completed_date || "",
         status: objective?.status || "Not Started",
         priority: objective?.priority || "Normal",
         percent_complete: objective?.percent_complete || 0,
         objective_type: objective?.objective_type || "",
         category: objective?.category || "",
         notes: objective?.notes || "",
         is_visible_to_tf_members: objective?.is_visible_to_tf_members || false,
      },
      validationSchema: Yup.object({
         name: Yup.string().required("Objective Name is required"),
         owner_id: Yup.string(),
         goal_id: Yup.string(),
         related_account_id: Yup.string(),
         start_date: Yup.string(),
         due_date: Yup.string(),
         completed_date: Yup.string(),
         status: Yup.string(),
         priority: Yup.string(),
         percent_complete: Yup.number()
            .min(0, "Minimum is 0%")
            .max(100, "Maximum is 100%"),
         objective_type: Yup.string(),
         category: Yup.string(),
         notes: Yup.string(),
      }),
      onSubmit: (values, { resetForm }) => {
         save({
            isEditing,
            record: objective,
            values,
            options: {
               onClose,
               onSuccess,
               resetForm,
               saveAndNew: saveAndNewRef.current,
            },
         });
      },
   });

   return (
      <SharedModal isOpen onClose={onClose}>
         <div className={styles.modalHeader}>
            <h2>{isEditing ? `Edit ${objective.name}` : "New Objective"}</h2>
         </div>

         <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
            <div className={styles.pageContainer}>
               <h3 className={styles.sectionHeader}>Objective Information</h3>
               <div className={styles.gridContainer}>
                  <div className={styles.column}>
                     <label>Objective Name</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="name"
                           onChange={formik.handleChange}
                           value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name && (
                           <p className={styles.error}>{formik.errors.name}</p>
                        )}
                     </div>

                     <label>Owner</label>
                     <div className={styles.inputField}>
                        <UserLookup
                           value={formik.values.owner_id}
                           onChange={(val) =>
                              formik.setFieldValue("owner_id", val)
                           }
                           name="owner_id"
                        />
                     </div>

                     <label>Related Account</label>
                     <div className={styles.inputField}>
                        <AccountLookup
                           value={formik.values.related_account_id}
                           onChange={(val) =>
                              formik.setFieldValue("related_account_id", val)
                           }
                           name="related_account_id"
                        />
                     </div>

                     <label>Start Date</label>
                     <div className={styles.inputField}>
                        <DateInput
                           name="start_date"
                           value={formik.values.start_date}
                           onChange={(date) =>
                              formik.setFieldValue("start_date", date)
                           }
                        />
                     </div>

                     <label>Due Date</label>
                     <div className={styles.inputField}>
                        <DateInput
                           name="due_date"
                           value={formik.values.due_date}
                           onChange={(date) =>
                              formik.setFieldValue("due_date", date)
                           }
                        />
                     </div>

                     <label>Completed Date</label>
                     <div className={styles.inputField}>
                        <DateInput
                           name="completed_date"
                           value={formik.values.completed_date}
                           onChange={(date) =>
                              formik.setFieldValue("completed_date", date)
                           }
                        />
                     </div>
                  </div>

                  <div className={styles.column}>
                     <label>Status</label>
                     <input
                        type="text"
                        name="status"
                        onChange={formik.handleChange}
                        value={formik.values.status}
                     />

                     <label>Priority</label>
                     <input
                        type="text"
                        name="priority"
                        onChange={formik.handleChange}
                        value={formik.values.priority}
                     />

                     <label>Percent Complete</label>
                     <input
                        type="number"
                        name="percent_complete"
                        min={0}
                        max={100}
                        onChange={formik.handleChange}
                        value={formik.values.percent_complete}
                     />

                     <label>Objective Type</label>
                     <input
                        type="text"
                        name="objective_type"
                        onChange={formik.handleChange}
                        value={formik.values.objective_type}
                     />

                     <label>Category</label>
                     <input
                        type="text"
                        name="category"
                        onChange={formik.handleChange}
                        value={formik.values.category}
                     />

                     <label>
                        <input
                           type="checkbox"
                           name="is_visible_to_tf_members"
                           checked={formik.values.is_visible_to_tf_members}
                           onChange={formik.handleChange}
                        />{" "}
                        Visible to TF Members
                     </label>
                  </div>
               </div>

               <h3 className={styles.sectionHeader}>Description</h3>
               <textarea
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
               />

               <h3 className={styles.sectionHeader}>Notes</h3>
               <textarea
                  name="notes"
                  onChange={formik.handleChange}
                  value={formik.values.notes}
               />
            </div>

            <div className={styles.buttonContainer}>
               <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={onClose}
               >
                  Cancel
               </button>
               <button
                  type="button"
                  className={styles.primaryButton}
                  disabled={isCreating || isUpdating}
                  onClick={() => {
                     saveAndNewRef.current = true;
                     formik.handleSubmit();
                  }}
               >
                  Save & New
               </button>
               <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={isCreating || isUpdating}
                  onMouseDown={() => {
                     saveAndNewRef.current = false;
                  }}
               >
                  Save
               </button>
            </div>
         </form>
      </SharedModal>
   );
}

export default ObjectiveForm;
