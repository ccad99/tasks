import React, { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import SharedModal from "../Shared/SharedModal";
import { useCreateTask } from "./useCreateTask";
import { useUpdateTask } from "./useUpdateTask";
import { format, parseISO } from "date-fns";
import { getCurrentUser } from "../../services/apiAuth";
import { UserLookup, ContactLookup, AccountLookup } from "../shared/lookups/lookups";
import toast from "react-hot-toast";
import styles from "./TaskForm.module.css";

function TaskForm({ onClose, onSuccess, task: initialTask }) {
   const queryClient = useQueryClient();

   const [task, setTask] = useState(initialTask);
   const [isEditing, setIsEditing] = useState(!!initialTask);

   const { createTask, isCreating } = useCreateTask();
   const { updateTask, isUpdating } = useUpdateTask();

   const saveAndNew = useRef(false);

   const handleSave = async (
      values,
      saveAndNew,
      resetForm,
      onClose,
      onSuccess
   ) => {
      let user = queryClient.getQueryData(["user"]);

      // Fallback to Supabase if user is not in cache
      if (!user) {
         try {
            user = await getCurrentUser();
            if (user) {
               queryClient.setQueryData(["user"], user);
            }
         } catch (err) {
            console.error("Failed to fetch user:", err);
         }
      }

      if (!user || !user.custom_id) {
         console.error("No logged-in user available during task update.");
         toast.error("You must be logged in to perform this action.");
         return;
      }

      if (isEditing) {
         updateTask(
            { custom_id: task.custom_id, updateFields: values, user },
            { saveAndNew, resetForm, onClose, onSuccess }
         );
      } else {
         createTask(values, {
            saveAndNew,
            resetForm,
            onClose,
            onSuccess,
         });
      }

      saveAndNew.current = false;
   };

   const cachedUser = queryClient.getQueryData(["user"]);
   const defaultAssignedTo =
      !isEditing && cachedUser?.custom_id
         ? cachedUser.custom_id
         : task?.assigned_to || "";

   // Formik configuration
   const formik = useFormik({
      validateOnChange: false,
      validateOnBlur: true,
      initialValues: {
         subject: task?.subject || "",
         // assigned_to: task?.assigned_to || "",
         assigned_to: defaultAssignedTo,
         due_date: task?.due_date || "",
         status: task?.status || "Not Started",
         priority: task?.priority || "Normal",
         who_id: task?.who_id || "",
         what_id: task?.what_id || "",
         description: task?.description || "",
      },
      validationSchema: Yup.object({
         subject: Yup.string().required("Subject is required"),
         assigned_to: Yup.string().required("Assigned To is required"),
         due_date: Yup.string(),
         priority: Yup.string().required("Priority is required"),
         status: Yup.string().required("Status is required"),
         who_id: Yup.string(),
         what_id: Yup.string(),
         description: Yup.string(),
      }),

      onSubmit: (values, { resetForm }) =>
         handleSave(values, saveAndNew.current, resetForm, onClose, onSuccess), // Default is Save
   });

   return (
      <SharedModal isOpen onClose={onClose}>
         <div className={styles.modalHeader}>
            <h2>{isEditing ? `Edit ${task.subject}` : "New Task"}</h2>
         </div>
         <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
            <div className={styles.pageContainer}>
               <h3 className={styles.sectionHeader}>Task Information</h3>
               {/* Left Column */}
               <div className={styles.gridContainer}>
                  <div className={styles.column}>
                     <label>Subject</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="subject"
                           onChange={formik.handleChange}
                           value={formik.values.subject}
                        />
                        {formik.touched.subject && formik.errors.subject && (
                           <p className={styles.error}>
                              {formik.errors.subject}
                           </p>
                        )}
                     </div>

                     <label>Assigned To</label>
                     <div className={styles.inputField}>
                        <UserLookup
                           value={formik.values.assigned_to}
                           onChange={(val) =>
                              formik.setFieldValue("assigned_to", val)
                           }
                           name="assigned_to"
                        />
                        {formik.touched.assigned_to &&
                           formik.errors.assigned_to && (
                              <p className={styles.error}>
                                 {formik.errors.assigned_to}
                              </p>
                           )}
                     </div>

                     <label>Due Date</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="due_date"
                           onChange={formik.handleChange}
                           value={formik.values.due_date}
                        />
                        {formik.touched.due_date && formik.errors.due_date && (
                           <p className={styles.error}>
                              {formik.errors.due_date}
                           </p>
                        )}
                     </div>
                  </div>

                  {/* Right Column */}
                  <div className={styles.column}>
                     <label>Priority</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="priority"
                           onChange={formik.handleChange}
                           value={formik.values.priority}
                        />
                        {formik.touched.priority && formik.errors.priority && (
                           <p className={styles.error}>
                              {formik.errors.priority}
                           </p>
                        )}
                     </div>

                     <label>Status</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="status"
                           onChange={formik.handleChange}
                           value={formik.values.status}
                        />
                        {formik.touched.status && formik.errors.status && (
                           <p className={styles.error}>
                              {formik.errors.status}
                           </p>
                        )}
                     </div>

                     <p>Completed Date / Time</p>
                     <div className={styles.displayField}>
                        {/* {task.completed_date ? task.completed_date : ""} */}
                        <p>Completed Date Goes Here</p>
                     </div>
                  </div>
               </div>

               {/* Contact Information */}
               <h3 className={styles.sectionHeader}>Contact Information</h3>
               <div className={styles.gridContainer}>
                  <div className={styles.column}>
                     <label>Name</label>
                     <div className={styles.inputField}>
                     <ContactLookup
                        value={formik.values.who_id}
                        onChange={(val) => formik.setFieldValue("who_id", val)}
                        name="who_id"
                     />
                     <label>Related To</label>
                     <div className={styles.inputField}>
                     <AccountLookup
                        value={formik.values.what_id}
                        onChange={(val) => formik.setFieldValue("what_id", val)}
                        name="what_id"
                     />
                     </div>
                  </div>
               </div>
               {/* Audit Section - Created By / Last Modified By -- only on Edit */}
               {isEditing && (
                  <>
                     <h3 className={styles.sectionHeader}>Audit Information</h3>
                     <div className={styles.gridContainer}>
                        <div className={styles.column}>
                           <label>Created By</label>
                           <p className={styles.readOnly}>
                              {task.created_by} - {task.created_date}
                           </p>
                        </div>
                        <div className={styles.column}>
                           <label>Last Modified By</label>
                           <p className={styles.readOnly}>
                              {task.lastmodified_by} - {task.lastmodified_date}
                           </p>
                        </div>
                     </div>
                  </>
               )}

               {/* Description */}
               <h3 className={styles.sectionHeader}>Description</h3>
               <textarea
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
               />
            </div>

            {/* Footer Buttons */}
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
                     saveAndNew.current = true;
                     handleSave(
                        formik.values,
                        true,
                        formik.resetForm,
                        onClose,
                        onSuccess
                     );
                  }}
               >
                  Save & New
               </button>
               <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={isCreating || isUpdating}
                  onMouseDown={() => {
                     saveAndNew.current = false; // mark that this is "Save"
                  }}
               >
                  Save
               </button>
            </div>
         </form>
      </SharedModal>
   );
}

export default TaskForm;
