import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../ui/CustomInput";
import CustomSelect from "../../ui/CustomSelect";

function CustomTaskForm() {
   const basicSchema = Yup.object({
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
   });

   return (
      <Formik
         initialValues={{ username: "", job: "", terms: false }}
         validationSchema={basicSchema}
      >
         {(props) => (
            <Form>
               <CustomInput
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
               />
               <CustomSelect
                  label="Job Type"
                  name="job"
                  type="text"
                  placeholder="Select your Job Type"
               >
                  <option value="">Please select a job type</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="manager">Manager</option>
                  <option value="other">Other</option>
               </CustomSelect>

               <CustomCheckbox type="checkbox" name="terms" />
            </Form>
         )}
         ;
      </Formik>
   );
}

export default CustomTaskForm;
