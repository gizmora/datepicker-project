import { MONTHS } from '../../data/months';

function Header({year, month}) {
  return (
    <div className="row month-year-header">
      <div className="previous-btn">&lt;</div>
      <div className="month-year">{`${MONTHS[month].fullName} ${year}`} </div>
      <div className="next-btn">&gt;</div>
    </div>
  )
}

export default Header;