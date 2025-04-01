// src/helpers/saveHelpers.js
export function buildSaveOptions({
   saveAndNew = false,
   formik = null,
   onClose = null,
   onSuccess = null,
   onBeforeSave = null, // Optional hook for pre-save actions
}) {
   return {
      saveAndNew,
      resetForm: formik?.resetForm || (() => {}),
      onClose: onClose || (() => {}),
      onSuccess: onSuccess || (() => {}),
      onBeforeSave: onBeforeSave || null, // if needed
   };
}
