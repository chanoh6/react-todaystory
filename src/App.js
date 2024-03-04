import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { APIProvider } from 'context/APIContext';
import { ScrollToTop } from 'components';
import 'styles/App.css';
import { styled } from 'styled-components';
import Loading from 'components/Loading';

// 한국/글로벌/일본 별도 폰트 적용
const FontWrapper = styled.div`
  font-family: ${process.env.REACT_APP_LOCALE_FONT}, sans-serif;
`;

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <APIProvider>
        <FontWrapper>
          <ScrollToTop />
          {loading ? <Loading /> : <Outlet />}
        </FontWrapper>
      </APIProvider>
    </>
  );
}

export default App;
