import { useState } from "react";
import { addMonths, subMonths } from "date-fns";
import { getCalendarMatrix } from "./calendarUtils";
import CalendarHeader from "./CalendarHeader";
import CalendarSidebar from "./CalendarSidebar";
import CalendarGrid from "./CalendarGrid";
import CalendarInfoPanel from "./CalendarInfoPanel";
import styles from "./Calendar.module.css";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);
  const weekStartDay = 0; // 0 = Sunday, 1 = Monday, etc.

  const events = [
    { id: "1", title: "Project Kickoff", date: "2025-04-15" },
    { id: "2", title: "Doctor Appointment", date: "2025-04-18" },
    { id: "3", title: "Lunch with Alex", date: "2025-04-18" },
  ];

  const matrix = getCalendarMatrix(currentDate, weekStartDay);

  return (
    <div className={styles.calendarContainer}>
      <CalendarSidebar />
      <div className={styles.calendarMain}>
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={() => setCurrentDate(subMonths(currentDate, 1))}
          onNextMonth={() => setCurrentDate(addMonths(currentDate, 1))}
        />
        <CalendarGrid
          matrix={matrix}
          weekStartDay={weekStartDay}
          events={events}
          onDayHover={setHoveredDate}
        />
      </div>
      <CalendarInfoPanel hoveredDate={hoveredDate} events={events} />
    </div>
  );
}

export default Calendar;
