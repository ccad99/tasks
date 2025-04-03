import { format } from "date-fns";
import { getWeekdayLabels, getEventsForDate } from "./calendarUtils";
import { isToday } from "date-fns";
import styles from "./Calendar.module.css";

function CalendarGrid({ matrix, weekStartDay, events, onDayHover }) {
  const dayLabels = getWeekdayLabels(weekStartDay);

  return (
    <div className={styles.calendarGrid}>
      {/* Weekday Headers */}
      {dayLabels.map((day) => (
        <div
          key={day}
          className={`${styles.calendarCell} ${styles.calendarCellHeader}`}
        >
          {day}
        </div>
      ))}

      {/* Calendar Days */}
      {matrix.flat().map((day, i) => {
        const dayEvents = getEventsForDate(day, events);
        return (
          <div
            key={i}
            className={`${styles.calendarCell} ${
              isToday(day) ? styles.calendarCellToday : ""
            }`}
            onMouseEnter={() => onDayHover(day)}
            onMouseLeave={() => onDayHover(null)}
          >
            <div className={styles.dateNumber}>{format(day, "d")}</div>
            <div className={styles.events}>
              {dayEvents.length > 0 && <div>{dayEvents.length} event(s)</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CalendarGrid;
