import { useMonthlyCalendar } from "@zach.codes/react-calendar";
import {
  format,
  addMonths,
  subMonths,
  getYear,
  startOfMonth,
  compareAsc,
} from "date-fns";

export const MonthlyNav = () => {
  let { currentMonth, onCurrentMonthChange } = useMonthlyCalendar();
  const originalMonth = startOfMonth(new Date());

  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={() => onCurrentMonthChange(subMonths(currentMonth, 1))}
        className={`btn calendar-cursor`}
      >
        Previous
      </button>
      <div
        className={`btn ml-4 mr-4 w-32 text-center ${
          compareAsc(originalMonth, currentMonth) ? "toggle" : ""
        }`}
      >
        {format(
          currentMonth,
          getYear(currentMonth) === getYear(new Date()) ? "LLLL" : "LLLL yyyy"
        )}
      </div>
      <button
        onClick={() => onCurrentMonthChange(addMonths(currentMonth, 1))}
        className="btn calendar-cursor"
      >
        Next
      </button>
    </div>
  );
};
