// src/utils/mockUserDevSetup.js

export const DEV_MOCK_USER = {
   custom_id: "USR00000001",
   email: "ccad99@gmail.com",
   role: "Admin",
};

// Optional helper for conditionally mocking
export function setMockUser(queryClient) {
   if (import.meta.env.MODE === "development") {
      queryClient.setQueryData(["user"], DEV_MOCK_USER);
   }
}
