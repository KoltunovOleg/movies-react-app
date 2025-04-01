import React from 'react';
import './sort-control.scss';

function SortControl({ currentSelection, onSortChange }) {
  const handleChange = (event) => {
    onSortChange?.(event.target.value);
  };

  return (
    <div className="sort-control">
      <label htmlFor="sort-control-select" className="sort-control__label">
        Sort by
      </label>
      <select
        id="sort-control-select"
        className="sort-control__select"
        value={currentSelection}
        onChange={handleChange}
      >
        <option value="releaseDate">Release Date</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
}

export default SortControl;