import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const handlePressKey = evn => {
      if (evn.key !== 'Escape') {
        return;
      }
      onClose();
    };

    document.documentElement.style.overflowY = 'hidden';
    window.addEventListener('keydown', handlePressKey);

    return () => {
      document.documentElement.style.overflowY = '';
      window.removeEventListener('keydown', handlePressKey);
    };
  }, [onClose]);

  const handleClickOverlay = evn => {
    if (evn.target !== evn.currentTarget) {
      return;
    }
    onClose();
  };

  return (
    <div className={css.overlay} onClick={handleClickOverlay}>
      <div className={css.modal}>
        <img width={700} height={500} src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

export default Modal;
