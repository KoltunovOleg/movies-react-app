import React, { Component } from 'react';
import './counter.scss';


class Counter extends Component {
  constructor(props) {
    super(props);


    this.state = {
      count: props.initialValue
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }

  decrement() {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  }

  render() {
    return React.createElement(
      'div',
      { className: 'counter' },
      React.createElement(
        'p',
        { className: 'counter__value' },
        `Count: ${this.state.count}`
      ),
      React.createElement(
        'button',
        {
          className: 'counter__button',
          onClick: this.decrement,
        },
        'Decrement'
      ),
      React.createElement(
        'button',
        {
          className: 'counter__button',
          onClick: this.increment,
        },
        'Increment'
      )
    );
  }
}

export default Counter;