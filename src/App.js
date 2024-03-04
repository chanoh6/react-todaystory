import { Outlet } from 'react-router-dom';
import { ApiProvider } from 'context/ApiContext';
import { ScrollToTop } from 'components';
import 'styles/App.css';
import { styled } from 'styled-components';
import Loading from 'components/Loading';
import { useLoading } from 'hooks/loading';

// 한국/글로벌/일본 별도 폰트 적용
const FontWrapper = styled.div`
  font-family: ${process.env.REACT_APP_LOCALE_FONT}, sans-serif;
`;

function App() {
  const loading = useLoading();
  return (
    <>
      <ApiProvider>
        <FontWrapper>
          <ScrollToTop />
          {loading ? <Loading /> : <Outlet />}
        </FontWrapper>
      </ApiProvider>
    </>
  );
}
export default App;
