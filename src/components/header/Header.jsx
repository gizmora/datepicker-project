import { MONTHS } from '../../data/months';
import PropTypes from 'prop-types';
import './Header.css';

function Header({year, month, modifyMonth, modifyYear}) {

  function clickNavButtonHandler(num) {
    var computedMonth, computedYear = 0;
    if (num > 0) {
      computedMonth = month === 11 ? 0 : month+1;
      computedYear = month === 11 ? year+1 : year;
    } else if (num < 0) {
      computedMonth = month === 0 ? 11 : month-1;
      computedYear = month === 0 ? year-1:year;
    }

    modifyMonth(computedMonth);
    modifyYear(computedYear);
  }
  
  return (
    <div className="row month-year-header">
      <div className="nav-btn" onClick={() => clickNavButtonHandler(-1)}>&lt;</div>
      <div className="month-year">{`${MONTHS[month].fullName} ${year}`} </div>
      <div className="nav-btn" onClick={() => clickNavButtonHandler(1)}>&gt;</div>
    </div>
  )
}

Header.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  modifyMonth: PropTypes.func,
  modifyYear: PropTypes.func
}

export default Header;