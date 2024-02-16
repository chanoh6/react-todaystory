import { Outlet } from 'react-router-dom';
import { ApiProvider } from 'context/ApiContext';
import { ScrollToTop } from 'components';
import 'styles/App.css';

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
