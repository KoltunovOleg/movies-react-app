import React from 'react';
import './button-dots.scss';

function ButtonDots({ onClick }) {

  return (
    <div className="button-dots" onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}>
      <div className="button-dots__dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
}

export default ButtonDots;