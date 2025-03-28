import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateAuthUser() {
   const queryClient = useQueryClient();

   const { mutate: updateAuthUser, isLoading: isUpdating } = useMutation({
      //mutation function can only accept one argument, so pass an object and destructure it inside the function call
      mutationFn: updateCurrentUserApi,
      onSuccess: ({ user }) => {
         toast.success("User account successfully updated");
         queryClient.setQueryData(["user"], user);
         // queryClient.invalidateQueries({
         //    queryKey: ["user"],
         // });
      },
      onError: (err) => toast.error(err.message),
   });

   return { isUpdating, updateAuthUser };
}
