import React from 'react';
import { createPortal } from "react-dom";
// import FocusTrap from 'focus-trap-react';
import './dialog.scss';

function Dialog({ title, children, onClose }) {
  return createPortal(
    <>
      <div 
        className="dialog-overlay"
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}>
        <div
          className="dialog-container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="dialog-header">
            <h2 className="dialog-title">{title}</h2>
            <button
              className="dialog-close-button"
              onClick={onClose}
              aria-label="Close dialog"
            >
              &times;
            </button>
          </div>
          <div className="dialog-body">{children}</div>
        </div>
      </div>
    </>,
    document.getElementById('dialog-root')
  );
}

export default Dialog;