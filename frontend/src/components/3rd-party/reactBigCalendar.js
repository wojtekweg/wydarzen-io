import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { useNavigate } from "react-router-dom";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MyCalendar = (props) => {
  const navigate = useNavigate();

  // TODO add styling
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={props.events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={(calEvent) => {
          navigate("/events/" + calEvent.id);
        }}
        // views={["month"]}
        popup={true}
        // toolbar={false}
      />
    </div>
  );
};

export default MyCalendar;
