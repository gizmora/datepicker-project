import { useState } from "react";


function CalendarGrid ({month, year}) {
  const currentDay = new Date().getDate();
  const [selectedDay, setSelectedDay] = useState(currentDay);


  function clickDay(item) {
    if (item.isCurrentMonth) {
      setSelectedDay(item.day);
    }
  }

  // function generate() {
  //   var weeks = [];
  //   var curr = 1;
  //   var limit = month.days;
  
  //   for (var i=0; i<6; i++) {
  //     var days = new Array(7).fill(0);
  //     for (var j=0; j<days.length; j++) {
  //       var isCurrentMonth = (curr <= limit) ? true : false;
  //       var isSelected = (curr === selectedDay) ? true : false;

  //       days[j] = {
  //         day: (curr > limit ? curr-limit : curr),
  //         isCurrentMonth, 
  //         isSelected,
  //       };

  //       curr++;
  //     }
      
  //     weeks.push(days);
  //   }
    
  //   return weeks;
  // }

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
          currWeek.push({day: prevMonthDay++, month: prevMonth, year: prevMonthYear});
        } else if (currDay > currMonthDays) {
          currWeek.push({day: nextMonthDay++, month: nextMonth, year: nextMonthYear});
        } else {
          currWeek.push({day: currDay++, month: month, year: year});
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
                className={`day ${item.month === month ? 'current-month' : 'other-month'}${item.isSelected ? ' selected' : ''}`}
                onClick={() => clickDay(item)}
              >{item.day}</div>
            )
          })}
        </div>
      })}
    </>
  )
}

export default CalendarGrid;