import './button.scss';

function Button({ text, onClick, className = 'default' }) {
  return (
    <button 
        className={`btn btn-${className}`} 
        onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;