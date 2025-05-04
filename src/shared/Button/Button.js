import './button.scss';

function Button({ text, onClick, className = 'default', type = 'button' }) {
  return (
    <button
      type={type}
      className={`btn btn-${className}`}
      onClick={onClick}
      role="button"
    >
      {text}
    </button>
  );
}

export default Button;
