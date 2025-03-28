import React, { useState } from "react";
import ContactHeader from "../components/contacts/ContactHeader";
import ContactTable from "../components/contacts/ContactTable";
import { useContactsSorted } from "../components/contacts/useContactsSorted";
import Spinner from "../ui/Spinner";

function ContactPage() {
   const [sortBy, setSortBy] = useState("name"); // Default column
   const [order, setOrder] = useState("asc"); // Default order

   const { contacts, isLoading, error } = useContactsSorted(sortBy, order);

   // if (isLoading) return <p>Loading accounts...</p>;
   if (isLoading)
      return (
         <div style={{ minHeight: "300px" }}>
            <Spinner useAlt />
         </div>
      );

   if (error) return <p>Error loading accounts: {error.message}</p>;

   // Function to update sorting and trigger refetch
   const handleSort = (column) => {
      setOrder((prevOrder) =>
         sortBy === column && prevOrder === "asc" ? "desc" : "asc"
      );
      setSortBy(column);
   };

   const handleFilterChange = (filter) => {
      console.log("Filtering by:", filter);
   };

   const handleSearch = (query) => {
      console.log("Searching for:", query);
   };

   return (
      <div>
         <ContactHeader
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            count={contacts.length}
            sortBy={sortBy}
            order={order}
         />
         <ContactTable
            contacts={contacts}
            sortBy={sortBy}
            order={order}
            handleSort={handleSort}
         />
      </div>
   );
}

export default ContactPage;
