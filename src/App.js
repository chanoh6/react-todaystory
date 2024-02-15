import { Outlet } from 'react-router-dom';
import { ApiProvider } from 'context/ApiContext';
import 'styles/App.css';
import ScrollToTop from 'components/ScrollToTop';

function App() {
  return (
    <>
      <ApiProvider>
        <ScrollToTop />
        <Outlet />
      </ApiProvider>
    </>
  );
}

export default App;
