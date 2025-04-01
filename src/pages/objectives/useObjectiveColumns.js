// src/pages/objectives/useObjectiveColumns.js
import { HiArrowLongUp, HiArrowLongDown } from "react-icons/hi2";

export function useObjectiveColumns({ sortBy, order, handleSort }) {
   return [
      {
         Header: "Objective",
         accessor: "name",
         sortable: true,
      },
      {
         Header: "Goal",
         accessor: "goal_name",
         sortable: true,
      },
      {
         Header: "Owner",
         accessor: "owner_name",
         sortable: true,
      },
      {
         Header: "Start Date",
         accessor: "start_date",
         sortable: true,
      },
      {
         Header: "Due Date",
         accessor: "due_date",
         sortable: true,
      },
      {
         Header: "Status",
         accessor: "status",
         sortable: true,
      },
      {
         Header: "Priority",
         accessor: "priority",
         sortable: true,
      },
      {
         Header: "% Complete",
         accessor: "percent_complete",
         sortable: true,
      },
   ];
}
