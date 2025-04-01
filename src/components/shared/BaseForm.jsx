// Base Form for records
// src/shared/forms/BaseForm.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import SharedModal from "../SharedModal";
import DateInput from "../dates/DateInput";
import { UserLookup, ContactLookup, AccountLookup } from "../lookups/lookups";
import styles from "./BaseForm.module.css";

function BaseForm({
   title,
   fields,
   initialValues,
   validationSchema,
   isEditing,
   record,
   onClose,
   onSuccess,
   save,
   isCreating,
   isUpdating,
}) {
   return (
      <SharedModal isOpen onClose={onClose}>
         <div className={styles.modalHeader}>
            <h2>
               {isEditing ? `Edit ${record?.name || title}` : `New ${title}`}
            </h2>
         </div>

         <Formik
            initialValues={record || initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            validateOnChange={false}
            validateOnBlur={true}
            onSubmit={(values, { resetForm }) =>
               save({
                  isEditing,
                  record,
                  values,
                  options: {
                     onClose,
                     onSuccess,
                     resetForm,
                  },
               })
            }
         >
            {({ handleSubmit, setFieldValue, errors, touched, resetForm }) => (
               <Form className={styles.formContainer}>
                  <div className={styles.pageContainer}>
                     <div className={styles.gridContainer}>
                        {fields.map((field) => (
                           <div key={field.name} className={styles.fieldBlock}>
                              <label htmlFor={field.name}>{field.label}</label>

                              <div className={styles.inputField}>
                                 {field.type === "textarea" && (
                                    <Field
                                       as="textarea"
                                       name={field.name}
                                       className={styles.textarea}
                                    />
                                 )}

                                 {field.type === "date" && (
                                    <DateInput
                                       name={field.name}
                                       value={record?.[field.name] || ""}
                                       onChange={(val) =>
                                          setFieldValue(field.name, val)
                                       }
                                       error={
                                          touched[field.name] &&
                                          errors[field.name]
                                       }
                                    />
                                 )}

                                 {field.type === "userLookup" && (
                                    <UserLookup
                                       name={field.name}
                                       value={record?.[field.name] || ""}
                                       onChange={(val) =>
                                          setFieldValue(field.name, val)
                                       }
                                    />
                                 )}

                                 {field.type === "contactLookup" && (
                                    <ContactLookup
                                       name={field.name}
                                       value={record?.[field.name] || ""}
                                       onChange={(val) =>
                                          setFieldValue(field.name, val)
                                       }
                                    />
                                 )}

                                 {field.type === "accountLookup" && (
                                    <AccountLookup
                                       name={field.name}
                                       value={record?.[field.name] || ""}
                                       onChange={(val) =>
                                          setFieldValue(field.name, val)
                                       }
                                    />
                                 )}

                                 {["text", "number", "checkbox"].includes(
                                    field.type
                                 ) && (
                                    <Field
                                       name={field.name}
                                       type={field.type}
                                       min={field.min}
                                       max={field.max}
                                       className={styles.input}
                                    />
                                 )}

                                 <ErrorMessage
                                    name={field.name}
                                    component="p"
                                    className={styles.error}
                                 />
                              </div>
                           </div>
                        ))}
                     </div>
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
                        type="submit"
                        className={styles.primaryButton}
                        disabled={isCreating || isUpdating}
                        onClick={() => {
                           handleSubmit();
                        }}
                     >
                        Save
                     </button>
                  </div>
               </Form>
            )}
         </Formik>
      </SharedModal>
   );
}

export default BaseForm;
