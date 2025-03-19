import React, { useState } from "react";
import AccountHeader from "../components/Accounts/AccountHeader";
import AccountTable from "../components/Accounts/AccountTable";
import { useAccountsSorted } from "../components/Accounts/useAccountsSorted";

function AccountPage() {
   const [sortBy, setSortBy] = useState("name"); // Default column
   const [order, setOrder] = useState("asc"); // Default order

   const { accounts, isLoading, error } = useAccountsSorted(sortBy, order);

   if (isLoading) return <p>Loading accounts...</p>;
   if (error) return <p>Error loading accounts: {error.message}</p>;

   // Function to update sorting and trigger refetch
   const handleSort = (column) => {
      setOrder((prevOrder) =>
         sortBy === column && prevOrder === "asc" ? "desc" : "asc"
      );
      setSortBy(column);
   };

   const handleSearch = (query) => {
      console.log("Searching for:", query);
   };

   const handleFilterChange = (filter) => {
      console.log("Filtering by:", filter);
   };

   return (
      <div>
         <AccountHeader
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            count={accounts.length}
            sortBy={sortBy}
            order={order}
         />
         <AccountTable
            accounts={accounts}
            sortBy={sortBy}
            order={order}
            handleSort={handleSort}
         />
      </div>
   );
}

export default AccountPage;
