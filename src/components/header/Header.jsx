import { MONTHS } from "../../data/months";
import PropTypes from "prop-types";
import "./Header.css";

function Header({ monthState, yearState, typeState }) {
  const { selectedMonth, setSelectedMonth } = monthState;
  const { selectedYear, setSelectedYear } = yearState;
  const { headerType, setHeaderType } = typeState;

  function clickNavButtonHandler(num) {
    var computedMonth, computedYear = 0;

    if (headerType === 1) {
      if (num > 0) {
        computedMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
        computedYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear;
      } else if (num < 0) {
        computedMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
        computedYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
      }
    } else if (headerType > 1) {
      if (num > 0) {
        computedYear = headerType === 2 ? selectedYear + 1 : Math.ceil(selectedYear/10) * 10;
      } else if (num < 0) {
        computedYear = headerType === 2 ? selectedYear - 1 : Math.floor(selectedYear/10) * 10 - 1;
      }
      computedMonth = selectedMonth;
    }

    setSelectedMonth(computedMonth);
    setSelectedYear(computedYear);
  }

  function renderHeader() {
    switch (headerType) {
      case 2:
        return `${selectedYear}`;
      case 3:
        return `${Math.floor(selectedYear / 10) * 10 - 1}-${
          Math.ceil(selectedYear / 10) * 10
        }`;
      default:
        return `${MONTHS[selectedMonth].fullName} ${selectedYear}`;
    }
  }

  function clickHeader() {
    var type = headerType;
    if (headerType < 3) {
      type++;
    } else {
      type = 1;
    }

    setHeaderType(type);
  }

  return (
    <div className="row month-year-header">
      <div className="nav-btn" onClick={() => clickNavButtonHandler(-1)}>
        &lt;
      </div>
      <div className="month-year" onClick={() => clickHeader()}>
        {renderHeader()}
      </div>
      <div className="nav-btn" onClick={() => clickNavButtonHandler(1)}>
        &gt;
      </div>
    </div>
  );
}

Header.propTypes = {
  monthState: PropTypes.object,
  yearState: PropTypes.object,
  typeState: PropTypes.object,
};

export default Header;
