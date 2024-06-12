import PropTypes from 'prop-types';
import './YearView.css';

function YearView({ yearState, typeState }) {
  const { selectedYear, setSelectedYear } = yearState;
  const { setHeaderType } = typeState;

  function clickYearHandler(year) {
    setSelectedYear(year);
    setHeaderType(2);
  }

  function generateYearGrid() {
    var grid = [];
    var startYear = Math.floor(selectedYear/10) * 10 - 1;

    for (var i=0; i<3; i++) {
      var row = [];
      for (var j=0; j<4; j++) {
        row[j] = startYear;
        startYear++;
      }
      grid.push(row);
    }

    return grid;
  }

  function getClassForYear(year, rowIndex, yearIndex) {
    var isSelected = year === selectedYear;
    var isFirstOrLast = ((rowIndex === 0 && yearIndex === 0) || (rowIndex === 2 && yearIndex === 3));

    return `year${isSelected ? ' selected' : ''}${isFirstOrLast ? ' faded': ''}`;
  }
  
  var grid = generateYearGrid();

  return (
    <>
      {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
              {row.map((year, yearIndex) => {
                return (
                  <div key={yearIndex} className={getClassForYear(year, rowIndex, yearIndex)} onClick={() => clickYearHandler(year)}>{year}</div>
                )
              })}
            </div>
          )
      })}
    </>
  )
}

YearView.propTypes = {
  yearState: PropTypes.object,
  typeState: PropTypes.object
}
export default YearView;