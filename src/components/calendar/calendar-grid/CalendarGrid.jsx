import { useState } from "react";
import PropTypes from 'prop-types';
import './CalendarGrid.css';

function CalendarGrid ({month, year, modifyMonth, modifyYear}) {
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [selectedDay, setSelectedDay] = useState(currentDay);


  function clickDayHandler(item) {
    setSelectedDay(item.day);

    if (item.month !== month) {
      modifyMonth(item.month);
      modifyYear(item.year);
    }
  }

  function isToday(day) {
    return day === currentDay && currentMonth === month && currentYear === year;
  }

  function generate() {
    var weeks = [];
    var currMonthDays = countDaysInMonth(month, year);
    var firstDay = new Date(year, month, 1).getDay();

    var prevMonth = month === 0 ? 11 : month - 1;
    var prevMonthYear = month === 0 ? year - 1 : year;
    var prevMonthDays = countDaysInMonth(prevMonth, prevMonthYear);

    var nextMonth = month === 11 ? 0 : month + 1;
    var nextMonthYear = month === 11 ? year + 1 : year;

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
          currWeek.push({day: currDay, month: month, year: year, selected: currDay === selectedDay});
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

  var grid = generate();
  return (
    <>
      {grid.map((week,weekIndex) => {
        return <div key={weekIndex} className="row">
          {week.map((item,itemIndex) => {
            return (
              <div 
                key={itemIndex} 
                className={`day ${item.month === month ? 'current-month' : 'other-month'}${isToday(item.day) ? ' today' : ''}${item.selected ? ' selected' : ''}`}
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
  year: PropTypes.number,
  month: PropTypes.number,
  modifyMonth: PropTypes.func,
  modifyYear: PropTypes.func
}

export default CalendarGrid;