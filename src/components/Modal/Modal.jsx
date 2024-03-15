import { useEffect } from 'react';
import ModalContainer from 'components/Modal/ModalContainer';
import { styled } from 'styled-components';

const FontWrapper = styled.div`
  font-family: ${(props) => (props.lang === 'ko' || props.lang === 'en' ? 'Pretendard' : 'Pretendard JP')}, sans-serif;
`;

const Modal = (props) => {
  const { children } = props;
  const lang = process.env.REACT_APP_LOCALE;

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
      <FontWrapper lang={lang}>{children}</FontWrapper>
    </ModalContainer>
  );
};

export default Modal;
