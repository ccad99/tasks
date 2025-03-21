import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import PageHeader from "./pages/PageHeader";
import Dashboard from "./pages/Dashboard";
import TaskPage from "./pages/TaskPage";
import LoginPage from "./pages/LoginPage";
import AccountPage from "./pages/AccountPage";
import ContactPage from "./pages/ContactPage";
// import PageNotFound from "./pages/PageNotFound";
import ViewAccountPage from "./components/accounts/ViewAccountPage";
import ViewContactPage from "./components/contacts/ViewContactPage";
import ViewTaskPage from "./components/tasks/ViewTaskPage";
import { Toaster } from "react-hot-toast";

import { setMockUser } from "./utils/mockUserDevSetup";

// import Services from "./services/supabase.js";  /* Used for testing */

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 60 * 1000,
      },
   },
});

function App() {
   useEffect(() => {
      setMockUser(queryClient);
   }, [queryClient]);

   return (
      <QueryClientProvider client={queryClient}>
         <ReactQueryDevtools initialIsOpen={false} />
         <BrowserRouter>
            <div>
               <PageHeader />
               <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/accounts" element={<AccountPage />} />
                  <Route
                     path="/accounts/:custom_id"
                     element={<ViewAccountPage />}
                  />{" "}
                  {/* New Dynamic Route */}
                  <Route path="/contacts" element={<ContactPage />} />
                  <Route
                     path="/contacts/:custom_id"
                     element={<ViewContactPage />}
                  />{" "}
                  {/* New Dynamic Route */}
                  <Route path="/tasks" element={<TaskPage />} />
                  <Route
                     path="/tasks/:custom_id"
                     element={<ViewTaskPage />}
                  />{" "}
                  {/* New Dynamic Route */}
                  <Route path="/login" element={<LoginPage />} />
                  {/* <Route path="*" element={<PageNotFound />} /> */}
               </Routes>
            </div>
         </BrowserRouter>
         <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
               success: {
                  duration: 3000,
               },
               error: {
                  duration: 5000,
               },
               style: {
                  fontSize: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  backgroundColor: "var(--color-grey-100)",
                  color: "var(--color-grey-700",
               },
            }}
         />
      </QueryClientProvider>
   );
}

export default App;
