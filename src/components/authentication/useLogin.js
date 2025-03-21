export function useLogin() {
   const queryClient = useQueryClient();
   const navigate = useNavigate();

   const { mutate: login, isLoading: isLoggingIn } = useMutation({
      mutationFn: ({ email, password }) => loginApi({ email, password }),
      onSuccess: (user) => {
         // Store user info in React Query cache

         queryClient.setQueryData(["user"], {
            /** test Setting - use for DEV */
            custom_id: "",
            email: "ccad99@gmail.com",
            role: "Admin",

            /**  Live Code - enable for PROD  
            custom_id: user.custom_id,
            email: user.user.email,
            role: user.role,

          */
         });

         navigate("/dashboard", { replace: true });
      },
      onError: (err) => {
         console.log("ERROR", err);
         toast.error("Provided email or password are incorrect");
      },
   });

   return { login, isLoggingIn };
}

/***  OLD  OLD   OLD   ******/

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { login as loginApi } from "../../services/apiAuth";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export function useLogin() {
//    const queryClient = useQueryClient();
//    const navigate = useNavigate();

//    const { mutate: login, isLoading: isLoggingIn } = useMutation({
//       mutationFn: ({ email, password }) => loginApi({ email, password }),
//       onSuccess: (user) => {
//          queryClient.setQueryData(["user"], user.user);
//          navigate("/dashboard"), { replace: true };
//       },
//       onError: (err) => {
//          console.log("ERROR", err);
//          toast.error("Provided email or password are incorrect");
//       },
//    });

//    return { login, isLoggingIn };
// }
