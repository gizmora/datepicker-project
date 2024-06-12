import { useState } from "react";
import PropTypes from 'prop-types';
import './CalendarGrid.css';

function CalendarGrid ({ monthState, yearState }) {
  const currentDay = new Date().getDate();
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const {selectedMonth, setSelectedMonth} = monthState;
  const {selectedYear, setSelectedYear} = yearState;
  const daysHeader = ['Su','Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];


  function clickDayHandler(item) {
    setSelectedDay(item.day);

    if (item.month !== selectedMonth) {
      setSelectedMonth(item.month);
      setSelectedYear(item.year);
    }
  }

  function isToday(day) {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return day === currentDay && currentMonth === selectedMonth && currentYear === selectedYear;
  }

  function generate() {
    var weeks = [];
    var currMonthDays = countDaysInMonth(selectedMonth, selectedYear);
    var firstDay = new Date(selectedYear, selectedMonth, 1).getDay();

    var prevMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
    var prevMonthYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
    var prevMonthDays = countDaysInMonth(prevMonth, prevMonthYear);

    var nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
    var nextMonthYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear;

    var currDay = 1;
    var prevMonthDay = prevMonthDays - firstDay + 1;
    var nextMonthDay = 1;

    for (var week=0; week < 6; week++) {
      var currWeek = [];

      for (var day=0; day < 7; day++) {
        if (week === 0 && day < firstDay) {
          currWeek.push({day: prevMonthDay, month: prevMonth, year: prevMonthYear});
          prevMonthDay++;
        } else if (currDay > currMonthDays) {
          currWeek.push({day: nextMonthDay, month: nextMonth, year: nextMonthYear});
          nextMonthDay++;
        } else {
          currWeek.push({day: currDay, month: selectedMonth, year: selectedYear, selected: currDay === selectedDay});
          currDay++;
        }
      }

      weeks.push(currWeek);
    }

    return weeks;
  }

  function countDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  const grid = generate();
  return (
    <>
      <div className="row">
        {daysHeader.map((day,index) => {
          return <div key={index} className="name">{day}</div>
        })}
      </div>
      {grid.map((week,weekIndex) => {
        return <div key={weekIndex} className="row">
          {week.map((item,itemIndex) => {
            return (
              <div 
                key={itemIndex} 
                className={`day ${item.month === selectedMonth ? 'current-month' : 'other-month'}${isToday(item.day) ? ' today' : ''}${item.selected ? ' selected' : ''}`}
                onClick={() => clickDayHandler(item)}
              >{item.day}</div>
            )
          })}
        </div>
      })}
    </>
  )
}

CalendarGrid.propTypes = {
  monthState: PropTypes.object,
  yearState: PropTypes.object
}

export default CalendarGrid;