import { Outlet } from 'react-router-dom';
import { APIProvider } from 'context/APIContext';
import { ScrollToTop } from 'components';
import { styled } from 'styled-components';
import 'styles/App.css';

// 한국/글로벌/일본 별도 폰트 적용
const FontWrapper = styled.div`
  font-family: ${process.env.REACT_APP_LOCALE_FONT}, sans-serif;
`;

function App() {
  return (
    <>
      <APIProvider>
        <FontWrapper>
          <ScrollToTop />
          <Outlet />
        </FontWrapper>
      </APIProvider>
    </>
  );
}
export default App;
