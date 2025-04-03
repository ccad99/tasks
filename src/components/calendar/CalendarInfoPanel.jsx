import { format } from "date-fns";
import { getEventsForDate } from "./calendarUtils";
import styles from "./Calendar.module.css";

function CalendarInfoPanel({ hoveredDate, events }) {
  if (!hoveredDate) {
    return (
      <aside className={styles.calendarSidebar}>
        <p>Hover a date to see details</p>
      </aside>
    );
  }

  const dayEvents = getEventsForDate(hoveredDate, events);

  return (
    <aside className={styles.calendarSidebar}>
      <h3>{format(hoveredDate, "MMMM d, yyyy")}</h3>
      {dayEvents.length > 0 ? (
        <ul>
          {dayEvents.map((event) => (
            <li key={event.id} className={styles.eventItem}>
              <strong>{event.title}</strong> - <em>{event.status}</em>
            </li>
          ))}
        </ul>
      ) : (
        <p>No events for this day.</p>
      )}
    </aside>
  );
}

export default CalendarInfoPanel;
