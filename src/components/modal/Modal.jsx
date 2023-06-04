import React, { useEffect } from 'react';
import { Overlay, ModalImg } from './Modal.styled';

export function Modal({ closeModal, modalImage }) {
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalImg>
        <img src={modalImage} alt="modalImage" />
      </ModalImg>
    </Overlay>
  );
}
