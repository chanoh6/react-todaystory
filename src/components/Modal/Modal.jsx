import { useEffect } from 'react';
import ModalContainer from 'components/Modal/ModalContainer';

function Modal({ children }) {
  useEffect(() => {
    const $body = document.querySelector('body');
    const overflow = $body.style.overflow;
    $body.style.overflow = 'hidden';
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);

  return <ModalContainer>{children}</ModalContainer>;
}

export default Modal;
