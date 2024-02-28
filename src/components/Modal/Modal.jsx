import { useEffect } from 'react';
import ModalContainer from 'components/Modal/ModalContainer';
import { styled } from 'styled-components';

const FontWrapper = styled.div`
  font-family: ${process.env.REACT_APP_LOCALE_FONT}, sans-serif;
`;

function Modal({ children }) {
  useEffect(() => {
    const $body = document.querySelector('body');
    const overflow = $body.style.overflow;
    $body.style.overflow = 'hidden';
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);

  return (
    <ModalContainer>
      <FontWrapper>{children}</FontWrapper>
    </ModalContainer>
  );
}

export default Modal;
