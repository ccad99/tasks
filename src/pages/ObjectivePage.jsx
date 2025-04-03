// src/pages/objectives/ObjectivePage.jsx
import { useState } from "react";
import ObjectiveHeader from "../components/objectives/ObjectiveHeader";
import ObjectiveTable from "../components/objectives/ObjectiveTable";
import { useDataSorted } from "../hooks/useDataSorted";
import Spinner from "../ui/Spinner";

function ObjectivePage() {
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const {
    data: objectives,
    isLoading,
    error,
  } = useDataSorted({
    table: "objective",
    view: "objective_view",
    sortBy,
    order,
  });

  if (isLoading)
    return (
      <div style={{ minHeight: "300px" }}>
        <Spinner useAlt />
      </div>
    );

  if (error) return <p>Error loading objectives: {error.message}</p>;

  const handleSort = (column) => {
    setOrder((prev) => (sortBy === column && prev === "asc" ? "desc" : "asc"));
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
      <ObjectiveHeader
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        count={objectives.length}
        sortBy={sortBy}
        order={order}
      />
      <ObjectiveTable
        objectives={objectives}
        sortBy={sortBy}
        order={order}
        handleSort={handleSort}
      />
    </div>
  );
}

export default ObjectivePage;
