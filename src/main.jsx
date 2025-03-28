import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import App from "./App.jsx";
import { AuthProvider } from "./components/authentication/AuthProvider.jsx";

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 60 * 1000, // 1 minute (or customize as needed)
      },
   },
});

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <QueryClientProvider client={queryClient}>
         <AuthProvider timeoutDuration={60 * 60 * 1000}>
            {/* 60 min for dev */}
            <App />
         </AuthProvider>
      </QueryClientProvider>
   </React.StrictMode>
);
