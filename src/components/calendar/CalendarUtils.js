import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  addMonths,
  subMonths,
} from "date-fns";

import { isSameDay } from "date-fns";

// Filters events matching a specific day
export function getEventsForDate(day, events) {
  return events.filter((event) => isSameDay(day, new Date(event.date)));
}

export function getCalendarMatrix(date, weekStartDay = 0) {
  const startDate = startOfWeek(startOfMonth(date), {
    weekStartsOn: weekStartDay,
  });
  const endDate = endOfWeek(endOfMonth(date), { weekStartsOn: weekStartDay });

  const matrix = [];
  let day = startDate;

  while (day <= endDate) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(day);
      day = addDays(day, 1);
    }
    matrix.push(week);
  }
  return matrix;
}

export function getWeekdayLabels(weekStartDay = 0) {
  const base = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return [...base.slice(weekStartDay), ...base.slice(0, weekStartDay)];
}
