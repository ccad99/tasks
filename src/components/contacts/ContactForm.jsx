import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SharedModal from "../Shared/SharedModal";
import { useCreateContact } from "./useCreateContact";
import { useUpdateContact } from "./useUpdateContact";
import styles from "./ContactForm.module.css";

const ContactForm = ({ onClose, contact: initialContact }) => {
   const [contact, setContact] = useState(initialContact);
   const [isEditing, setIsEditing] = useState(!!initialContact);

   const { createContact, isCreating } = useCreateContact();
   const { updateContact, isUpdating } = useUpdateContact();

   const handleSave = (values, saveAndNew, resetForm) => {
      if (isEditing) {
         //Update existing record
         updateContact(
            { custom_id: contact.custom_id, updateFields: values },
            {
               onSuccess: () => {
                  if (saveAndNew) {
                     resetForm({
                        values: {
                           firstname: "",
                           lastname: "",
                           title: "",
                           department: "",
                           phone1: "",
                           phone2: "",
                           email: "",
                           description: "",
                        },
                     }); //clear form for new entry
                     setIsEditing(false); // Set isEditing to false
                     setContact(null); // Reset contact to null
                  } else {
                     onClose(); //close modal
                  }
               },
            }
         );
      } else {
         //create new record
         createContact(values, {
            onSuccess: () => {
               if (saveAndNew) {
                  resetForm({
                     values: {
                        firstname: "",
                        lastname: "",
                        title: "",
                        department: "",
                        phone1: "",
                        phone2: "",
                        email: "",
                        description: "",
                     },
                  }); //clear form for new entry
                  setIsEditing(false); // Set isEditing to false
                  setContact(null); // Reset contact to null
               } else {
                  onClose(); // close modal
               }
            },
         });
      }
   };

   // Formik configuration
   const formik = useFormik({
      validateOnChange: false,
      validateOnBlur: true,
      initialValues: {
         firstname: contact?.firstname || "",
         lastname: contact?.lastname || "",
         title: contact?.title || "",
         department: contact?.department || "",
         phone1: contact?.phone1 || "",
         phone2: contact?.phone2 || "",
         email: contact?.email || "",
         description: contact?.description || "",
      },
      validationSchema: Yup.object({
         firstname: Yup.string().required("First Name is required"),
         lastname: Yup.string().required("Last Name is required"),
         title: Yup.string(),
         department: Yup.string(),
         phone1: Yup.string().required("Primary phone# is required"),
         phone2: Yup.string(),
         email: Yup.string().email().required("Email is required"),
         description: Yup.string(),
      }),

      onSubmit: (values, { resetForm }) => handleSave(values, false, resetForm), // Default is Save
   });

   return (
      <SharedModal isOpen onClose={onClose}>
         <div className={styles.modalHeader}>
            <h2>{isEditing ? `Edit ${contact.name}` : "New Contact"}</h2>
         </div>
         <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
            <div className={styles.pageContainer}>
               <h3 className={styles.sectionHeader}>Contact Information</h3>
               {/* Left Column */}
               <div className={styles.gridContainer}>
                  <div className={styles.column}>
                     <label>First Name</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="firstname"
                           onChange={formik.handleChange}
                           value={formik.values.firstname}
                        />
                        {formik.touched.firstname &&
                           formik.errors.firstname && (
                              <p className={styles.error}>
                                 {formik.errors.firstname}
                              </p>
                           )}
                     </div>

                     <label>Last Name</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="lastname"
                           onChange={formik.handleChange}
                           value={formik.values.lastname}
                        />
                        {formik.touched.lastname && formik.errors.lastname && (
                           <p className={styles.error}>
                              {formik.errors.lastname}
                           </p>
                        )}
                     </div>

                     <label>Title</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="title"
                           onChange={formik.handleChange}
                           value={formik.values.title}
                        />
                        {formik.touched.title && formik.errors.title && (
                           <p className={styles.error}>{formik.errors.title}</p>
                        )}
                     </div>

                     <label>Department</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="department"
                           onChange={formik.handleChange}
                           value={formik.values.department}
                        />
                        {formik.touched.department &&
                           formik.errors.department && (
                              <p className={styles.error}>
                                 {formik.errors.department}
                              </p>
                           )}
                     </div>
                  </div>

                  {/* Right Column */}
                  <div className={styles.column}>
                     <label>Phone1</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="phone1"
                           onChange={formik.handleChange}
                           value={formik.values.phone1}
                           className={
                              formik.touched.phone1 && formik.errors.phone1
                                 ? styles.errorInput
                                 : ""
                           }
                        />
                        {formik.touched.phone1 && formik.errors.phone1 && (
                           <p className={styles.errorMessage}>
                              {formik.errors.phone1}
                           </p>
                        )}
                     </div>

                     <label>Phone2</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="phone2"
                           onChange={formik.handleChange}
                           value={formik.values.phone2}
                        />
                     </div>

                     <label>Email</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="email"
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.email}
                           className={
                              formik.touched.email && formik.errors.email
                                 ? styles.errorInput
                                 : ""
                           }
                        />
                        {formik.touched.email && formik.errors.email && (
                           <p className={styles.errorMessage}>
                              {formik.errors.email}
                           </p>
                        )}
                     </div>
                  </div>
               </div>

               {/* Address Section */}
               {/* <h3 className={styles.sectionHeader}>Address Information</h3>
               <div className={styles.gridContainer}>
                  <div className={styles.column}>
                     <label>Street1</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="street1"
                           onChange={formik.handleChange}
                           value={formik.values.street1}
                        />
                     </div>
                     <label>Street2</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="street2"
                           onChange={formik.handleChange}
                           value={formik.values.street2}
                        />
                     </div>
                  </div>
                  <div className={styles.column}>
                     <label>City</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="city"
                           onChange={formik.handleChange}
                           value={formik.values.city}
                        />
                     </div>

                     <label>State</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="state"
                           onChange={formik.handleChange}
                           value={formik.values.state}
                        />
                     </div>

                     <label>Zipcode</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="zipcode"
                           onChange={formik.handleChange}
                           value={formik.values.zipcode}
                        />
                     </div>

                     <label>Country</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="country"
                           onChange={formik.handleChange}
                           value={formik.values.country}
                        />
                     </div>
                  </div>
               </div> */}
               {/* Audit Section - Created By / Last Modified By -- only on Edit */}
               {isEditing && (
                  <>
                     <h3 className={styles.sectionHeader}>Audit Information</h3>
                     <div className={styles.gridContainer}>
                        <div className={styles.column}>
                           <label>Created By</label>
                           <p className={styles.readOnly}>
                              {contact.created_by
                                 ? contact.created_by
                                 : "No name on File"}{" "}
                              - {contact.created_date}
                           </p>
                        </div>
                        <div className={styles.column}>
                           <label>Last Modified By</label>
                           <p className={styles.readOnly}>
                              {contact.lastmodified_by
                                 ? contact.lastmodified_by
                                 : "No name on File"}{" "}
                              - {contact.lastmodified_date}
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
                  disabled={isCreating}
                  onClick={() =>
                     handleSave(formik.values, true, formik.resetForm)
                  }
               >
                  Save & New
               </button>
               <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={isCreating}
               >
                  Save
               </button>
            </div>
         </form>
      </SharedModal>
   );
};

export default ContactForm;
