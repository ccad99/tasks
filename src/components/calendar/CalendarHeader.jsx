import { format } from "date-fns";
import styles from "./Calendar.module.css";

function CalendarHeader({ currentDate, onPrevMonth, onNextMonth }) {
  return (
    <div className={styles.calendarHeader}>
      <button onClick={onPrevMonth}>←</button>
      <h2>{format(currentDate, "MMMM yyyy")}</h2>
      <button onClick={onNextMonth}>→</button>
    </div>
  );
}

export default CalendarHeader;
