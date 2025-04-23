import './dropdown-menu.scss';

function DropdownMenu({ items, onClose, onSelect }) {
  return (
    <div
      className="dropdown"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <button
        className="dropdown__close"
        onClick={() => {
          onClose?.();
        }}
      >
        &times;
      </button>
      <ul className="dropdown__options">
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="dropdown__option"
            onClick={() => {
              onSelect?.(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropdownMenu;
