import './selector.scss';

function Selector({ items, onClose, onSelect }) {

  return (
    <div className="selector" 
    onClick={(e) => {e.stopPropagation()}}>
      <button className="selector__close" 
      onClick={() => {onClose?.()}}>
        &times;
      </button>
      <ul className="selector__options">
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="selector__option"
            onClick={() => {onSelect?.(item)}}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Selector;