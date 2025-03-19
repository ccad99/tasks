import { useField } from "formik";

const CustomCheckbox = ({ label, ...props }) => {
   const [field, meta] = useField(props);

   return (
      <>
         <div className="checkbox">
            <input
               {...field}
               {...props}
               className={meta.touched && meta.error ? "input-error" : ""}
            >
               <span>I accempt the Terms</span>
               {meta.touched && meta.error && (
                  <div className="error">{meta.error}</div>
               )}
            </input>
         </div>
      </>
   );
};

export default CustomCheckbox;
