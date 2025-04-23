import React, { useState } from 'react';
import Dialog from '../shared/Dialog/Dialog';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
};

// Ensure the #dialog-root exists in the DOM for Storybook
if (!document.getElementById('dialog-root')) {
  const dialogRoot = document.createElement('div');
  dialogRoot.id = 'dialog-root';
  document.body.appendChild(dialogRoot);
}

const DialogWrapper = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    action('Dialog Closed')();
  };

  return (
    <>
      {isOpen && (
        <Dialog title={title} onClose={handleClose}>
          {children}
        </Dialog>
      )}
      {!isOpen && <button onClick={() => setIsOpen(true)}>Open Dialog</button>}
    </>
  );
};

export const Default = () => (
  <DialogWrapper title="Default Dialog">
    <p>This is the content of the default dialog.</p>
  </DialogWrapper>
);

export const CustomDialog = () => (
  <DialogWrapper title="Custom Dialog">
    <div>
      <p>Some content goes here.</p>
      <button onClick={action('Button Clicked')}>Button</button>
    </div>
  </DialogWrapper>
);
