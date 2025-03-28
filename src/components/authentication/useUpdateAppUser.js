import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserFields } from "../../services/apiUsers";
import toast from "react-hot-toast";

export function useUpdateAppUser() {
   const queryClient = useQueryClient();

   const { mutate: updateAppUser, isLoading: isUpdating } = useMutation({
      mutationFn: ({ custom_id, fieldsToUpdate }) =>
         updateUserFields(custom_id, fieldsToUpdate),
      onSuccess: (updatedAppUser) => {
         toast.success("User successfully updated");
         queryClient.setQueryData(["user"], updatedAppUser);
      },
      onError: (err) => toast.error(err.message),
   });

   return { isUpdating, updateAppUser };
}
