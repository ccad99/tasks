import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Login from "./pages/Login";
import { useAutoLogoutPrompt } from "./components/authentication/useAutoLogoutPrompt";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UpdatePasswordPage from "./pages/UpdatePasswordPage";
import AppLayout from "./components/layout/AppLayout.jsx";
import Dashboard from "./pages/Dashboard";
import ObjectivePage from "./pages/ObjectivePage.jsx";
import TaskPage from "./pages/TaskPage";
import AccountPage from "./pages/AccountPage";
import ContactPage from "./pages/ContactPage";
import ViewAccountPage from "./components/accounts/ViewAccountPage";
import ViewContactPage from "./components/contacts/ViewContactPage";
import ViewTaskPage from "./components/tasks/ViewTaskPage";
import ViewObjectivePage from "./components/objectives/ViewObjectivePage";
import Calendar from "./components/calendar/Calendar.jsx";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";
import PageNotFound from "./pages/PageNotFound";
import ComingSoon from "./pages/ComingSoon";
import { Toaster } from "react-hot-toast";
import "./index.css";
import "./styles/global.css";

function App() {
  useAutoLogoutPrompt(90); // 90 minutes for dev

  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="accounts" element={<AccountPage />} />
            <Route path="accounts/:custom_id" element={<ViewAccountPage />} />
            <Route path="contacts" element={<ContactPage />} />
            <Route path="contacts/:custom_id" element={<ViewContactPage />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="objectives" element={<ObjectivePage />} />
            <Route
              path="objectives/:custom_id"
              element={<ViewObjectivePage />}
            />
            <Route path="tasks" element={<TaskPage />} />
            <Route path="tasks/:custom_id" element={<ViewTaskPage />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-100)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;
