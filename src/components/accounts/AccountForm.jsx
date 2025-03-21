import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
// import AccountModal from "./AccountModal";
import SharedModal from "../Shared/SharedModal";
import { useCreateAccount } from "./useCreateAccount";
import { useUpdateAccount } from "./useUpdateAccount";
import styles from "./AccountForm.module.css";

const AccountForm = ({ onClose, account: initialAccount }) => {
   const [account, setAccount] = useState(initialAccount);
   const [isEditing, setIsEditing] = useState(!!initialAccount);

   const { createAccount, isCreating } = useCreateAccount();
   const { updateAccount, isUpdating } = useUpdateAccount();

   const handleSave = (values, saveAndNew, resetForm) => {
      if (isEditing) {
         //Update existing record
         updateAccount(
            { custom_id: account.custom_id, updateFields: values },
            {
               onSuccess: () => {
                  if (saveAndNew) {
                     resetForm({
                        values: {
                           name: "",
                           account_num: "",
                           type: "",
                           industry: "",
                           phone1: "",
                           phone2: "",
                           website: "",
                           street1: "",
                           street2: "",
                           city: "",
                           state: "",
                           zipcode: "",
                           country: "",
                           description: "",
                        },
                     }); //clear form for new entry
                     setIsEditing(false); // Set isEditing to false
                     setAccount(null); // Reset account to null
                  } else {
                     onClose(); //close modal
                  }
               },
            }
         );
      } else {
         //create new record
         createAccount(values, {
            onSuccess: () => {
               if (saveAndNew) {
                  resetForm({
                     values: {
                        name: "",
                        account_num: "",
                        type: "",
                        industry: "",
                        phone1: "",
                        phone2: "",
                        website: "",
                        street1: "",
                        street2: "",
                        city: "",
                        state: "",
                        zipcode: "",
                        country: "",
                        description: "",
                     },
                  }); //clear form for new entry
                  setIsEditing(false); // Set isEditing to false
                  setAccount(null); // Reset account to null
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
         name: account?.name || "",
         account_num: account?.account_num || "",
         type: account?.type || "",
         industry: account?.industry || "",
         phone1: account?.phone1 || "",
         phone2: account?.phone2 || "",
         website: account?.website || "",
         street1: account?.street1 || "",
         street2: account?.street2 || "",
         city: account?.city || "",
         state: account?.state || "",
         zipcode: account?.zipcode || "",
         country: account?.country || "",
         description: account?.description || "",
      },
      validationSchema: Yup.object({
         name: Yup.string().required("Account Name is required"),
         account_num: Yup.string(),
         type: Yup.string(),
         industry: Yup.string(),
         phone1: Yup.string(),
         phone2: Yup.string(),
         website: Yup.string().matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            "Enter valid url!"
         ),
         street1: Yup.string(),
         street2: Yup.string(),
         city: Yup.string(),
         state: Yup.string(),
         zipcode: Yup.string(),
         country: Yup.string(),
         description: Yup.string(),
      }),

      onSubmit: (values, { resetForm }) => handleSave(values, false, resetForm), // Default is Save
   });

   return (
      <SharedModal isOpen onClose={onClose}>
         <div className={styles.modalHeader}>
            <h2>{isEditing ? `Edit ${account.name}` : "New Account"}</h2>
         </div>
         <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
            <div className={styles.pageContainer}>
               <h3 className={styles.sectionHeader}>Account Information</h3>
               {/* Left Column */}
               <div className={styles.gridContainer}>
                  <div className={styles.column}>
                     <label>Name</label>
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

                     <label>Account Number</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="account_num"
                           onChange={formik.handleChange}
                           value={formik.values.account_num}
                        />
                        {formik.touched.account_num &&
                           formik.errors.account_num && (
                              <p className={styles.error}>
                                 {formik.errors.account_num}
                              </p>
                           )}
                     </div>

                     <label>Type</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="type"
                           onChange={formik.handleChange}
                           value={formik.values.type}
                        />
                        {formik.touched.type && formik.errors.type && (
                           <p className={styles.error}>{formik.errors.type}</p>
                        )}
                     </div>
                     <label>Industry</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="industry"
                           onChange={formik.handleChange}
                           value={formik.values.industry}
                        />
                        {formik.touched.industry && formik.errors.industry && (
                           <p className={styles.error}>
                              {formik.errors.industry}
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
                        />
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

                     <label>Website</label>
                     <div className={styles.inputField}>
                        <input
                           type="text"
                           name="website"
                           // onChange={(e) => {
                           //    formik.setFieldTouched("website", true); // Mark field as touched
                           //    formik.setFieldValue("website", e.target.value); // Update the value
                           // }}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           value={formik.values.website}
                           className={
                              formik.touched.website && formik.errors.website
                                 ? styles.errorInput
                                 : ""
                           }
                        />
                        {formik.touched.website && formik.errors.website && (
                           <p className={styles.errorMessage}>
                              {formik.errors.website}
                           </p>
                        )}
                     </div>
                  </div>
               </div>

               {/* Address Section */}
               <h3 className={styles.sectionHeader}>Address Information</h3>
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
               </div>
               {/* Audit Section - Created By / Last Modified By -- only on Edit */}
               {isEditing && (
                  <>
                     <h3 className={styles.sectionHeader}>Audit Information</h3>
                     <div className={styles.gridContainer}>
                        <div className={styles.column}>
                           <label>Created By</label>
                           <p className={styles.readOnly}>
                              {account.created_by} - {account.created_date}
                           </p>
                        </div>
                        <div className={styles.column}>
                           <label>Last Modified By</label>
                           <p className={styles.readOnly}>
                              {account.lastmodified_by} -{" "}
                              {account.lastmodified_date}
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

export default AccountForm;
