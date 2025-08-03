'use client';

import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import React, { useEffect } from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}
export function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const handleBackdropClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target == e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClose}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
