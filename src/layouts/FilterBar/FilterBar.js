import React from 'react';
import './filter-bar.scss';

function FilterBar({ children }) {
  return <div className="filter-bar">{children}</div>;
}

export default FilterBar;