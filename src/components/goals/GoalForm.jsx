// src/features/goals/GoalForm.jsx

import BaseForm from "../../components/forms/BaseForm";

function GoalForm({ goal, onClose, onSuccess }) {
   return (
      <BaseForm
         record={goal}
         resourceName="Goal"
         tableName="goal"
         onClose={onClose}
         onSuccess={onSuccess}
      />
   );
}

export default GoalForm;
