import "./Calendar.css";
import Header from "../header/Header";
import { useState } from "react";
import CalendarGrid from "./calendar-grid/CalendarGrid";
import MonthView from "../month-view/MonthView";
import YearView from "../year-view/YearView";

function Calendar() {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [headerType, setHeaderType] = useState(1);

  function renderBody() {
    switch (headerType) {
      case 2:
        return (
          <MonthView
            monthState={{ selectedMonth, setSelectedMonth }}
            typeState={{ headerType, setHeaderType }}
          />
        );
      case 3:
        return (
          <YearView
            yearState={{ selectedYear, setSelectedYear }}
            typeState={{ headerType, setHeaderType }}
          />
        );
      default:
        return (
          <CalendarGrid
            monthState={{ selectedMonth, setSelectedMonth }}
            yearState={{ selectedYear, setSelectedYear }}
            dayState={{ selectedDay, setSelectedDay }}
          />
        );
    }
  }

  return (
    <div className="calendar">
      <Header
        monthState={{ selectedMonth, setSelectedMonth }}
        yearState={{ selectedYear, setSelectedYear }}
        typeState={{ headerType, setHeaderType }}
      />
      <div className="body">{renderBody()}</div>
    </div>
  );
}

export default Calendar;
