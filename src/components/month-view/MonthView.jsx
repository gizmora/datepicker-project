import "./MonthView.css";
import PropTypes from "prop-types";

function MonthView({ monthState, typeState }) {
  const { selectedMonth, setSelectedMonth } = monthState;
  const { setHeaderType } = typeState;
  const gridMonths = [
    [
      { id: 0, name: "Jan" },
      { id: 1, name: "Feb" },
      { id: 2, name: "Mar" },
      { id: 3, name: "Apr" },
    ],
    [
      { id: 4, name: "May" },
      { id: 5, name: "Jun" },
      { id: 6, name: "Jul" },
      { id: 7, name: "Aug" },
    ],
    [
      { id: 8, name: "Sep" },
      { id: 9, name: "Oct" },
      { id: 10, name: "Nov" },
      { id: 11, name: "Dec" },
    ],
  ];

  function clickMonthHandler(month) {
    setSelectedMonth(month);
    setHeaderType(1);
  }

  function getClassForMonth(month) {
    return `month${month.id === selectedMonth ? " selected" : ""}`;
  }

  return (
    <>
      {gridMonths.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="row">
            {row.map((month, monthIndex) => {
              return (
                <div key={monthIndex} className={getClassForMonth(month)} onClick={() => clickMonthHandler(month.id)}>{month.name}</div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

MonthView.propTypes = {
  monthState: PropTypes.object,
  typeState: PropTypes.object,
};

export default MonthView;
