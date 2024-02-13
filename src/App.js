import { Outlet } from 'react-router-dom';
import { TodaystoryApiProvider } from 'context/TodaystoryApiContext';
import 'styles/App.css';
import ScrollToTop from 'components/ScrollToTop';

function App() {
  return (
    <>
      <TodaystoryApiProvider>
        <ScrollToTop />
        <Outlet />
      </TodaystoryApiProvider>
    </>
  );
}

export default App;
