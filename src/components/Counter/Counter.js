import React, { useState } from 'react';
import './counter.scss';

function Counter({ initialValue }) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return React.createElement(
    'div',
    { className: 'counter' },
    React.createElement(
      'p',
      { className: 'counter__value' },
      `Count: ${count}`
    ),
    React.createElement(
      'button',
      {
        className: 'counter__button',
        onClick: decrement,
      },
      'Decrement'
    ),
    React.createElement(
      'button',
      {
        className: 'counter__button',
        onClick: increment,
      },
      'Increment'
    )
  );
}

export default Counter;