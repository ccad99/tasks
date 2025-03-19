import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { format, parseISO } from "date-fns";
import { useTask } from "./useTasks";
import styles from "./TaskForm.module.css";

function TaskForm() {
   const formik = useFormik({});

   const { task, isLoading, error } = useTask();

   if (isLoading) return <p>Loading tasks...</p>;
   if (error) return <p>Error loading tasks: {error.message}</p>;

   //Need to define status option values

   //Need to define prioirty option values

   return (
      <Formik
         initialValues={{
            subject: "",
            description: "",
            status: "Not Started",
            priority: "Normal",
            due_date: format(new Date(), "yyyy-MM-dd"),
            assigned_to: "",
            related_to: "",
         }}
         validationSchema={Yup.object({
            subject: Yup.string().required("Required"),
            description: Yup.string(),
            status: Yup.string()
               .oneOf([
                  "Not Started",
                  "In Progress",
                  "Completed",
                  "Deferred",
                  "Delayed",
               ])
               .required("Required"),
            priority: Yup.string()
               .oneOf(["High", "Normal", "Low"])
               .required("Required"),
            due_date: Yup.string(),
            assigned_to: Yup.string().required("Required"),
            related_to: Yup.string(),
            related_to_type: Yup.string(),
            completed_at: Yup.string(),
         })}
         onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
               alert(JSON.stringify(values, null, 2));
               setSubmitting(false);
            }, 400);
         }}
      >
         <Form>
            <label htmlFor="subject">Subject</label>
            <Field name="subject" type="text" />
            <ErrorMessage name="subject" />

            <label htmlFor="description">Description</label>
            <Field name="description" type="text" />
            <ErrorMessage name="description" />

            <label htmlFor="status">Status</label>
            <Field as="select" name="status" type="text">
               <option value="">Select a Status</option>
               <option value="Not Started">Not Started</option>
               <option value="In Progress">In Progress</option>
               <option value="Completed">Completed</option>
               <option value="Deferred">Deferred</option>
               <option value="Delayed">Delayed</option>
            </Field>
            <ErrorMessage name="status" />

            <label htmlFor="priority">Priority</label>
            <Field as="select" name="priority" type="text">
               <option>High</option>
               <option>Normal</option>
               <option>Low</option>
            </Field>
            <ErrorMessage name="priority" />

            <label htmlFor="due_date">Due Date</label>
            <Field name="due_date" type="date" />
            <ErrorMessage name="due_date" />

            <label htmlFor="assigned_to">Assigned To</label>
            <Field name="assigned_to" type="email" />
            <ErrorMessage name="assigned_to" />

            <label htmlFor="related_to">Name</label>
            <Field name="related_to" type="text" />
            <ErrorMessage name="related_to" />

            <button type="submit">Submit</button>
         </Form>
      </Formik>
   );
}

export default TaskForm;
