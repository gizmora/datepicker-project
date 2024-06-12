import './Calendar.css';
import Header from '../header/Header';
import { useState } from "react";
import CalendarGrid from './calendar-grid/CalendarGrid';
import MonthView from '../month-view/MonthView';

const daysHeader = ['Su','Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function Calendar() {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  return (
    <div className="calendar">
      <Header month={selectedMonth} year={selectedYear} modifyMonth={setSelectedMonth} modifyYear={setSelectedYear}></Header>
      <div className="row">
        {daysHeader.map((day,index) => {
          return <div key={index} className="name">{day}</div>
        })}
      </div>
      <div className="body">
        <CalendarGrid month={selectedMonth} year={selectedYear} modifyMonth={setSelectedMonth} modifyYear={setSelectedYear}></CalendarGrid>
        <MonthView monthState={{selectedMonth, setSelectedMonth}}></MonthView>
      </div>
    </div>
  )
    
}

export default Calendar;