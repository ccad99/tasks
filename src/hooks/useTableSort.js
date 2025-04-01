// src/hooks/useTableSort.js

import { useState, useMemo } from "react";

/**
 * Generic sorting hook for table data
 * @param {Array} data - The array of records to sort
 * @param {string} defaultSortBy - The field to sort by initially
 */
export function useTableSort(data, defaultSortBy = "") {
   const [sortBy, setSortBy] = useState(defaultSortBy);
   const [order, setOrder] = useState("asc"); // "asc" or "desc"

   const handleSort = (field) => {
      if (field === sortBy) {
         // Toggle order if clicking the same field
         setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
      } else {
         setSortBy(field);
         setOrder("asc"); // default to ascending when switching fields
      }
   };

   const sortedData = useMemo(() => {
      if (!Array.isArray(data)) return [];

      return [...data].sort((a, b) => {
         const aVal = a[sortBy] ?? "";
         const bVal = b[sortBy] ?? "";

         if (typeof aVal === "number" && typeof bVal === "number") {
            return order === "asc" ? aVal - bVal : bVal - aVal;
         }

         return order === "asc"
            ? String(aVal).localeCompare(String(bVal))
            : String(bVal).localeCompare(String(aVal));
      });
   }, [data, sortBy, order]);

   return { sortBy, order, sortedData, handleSort };
}
