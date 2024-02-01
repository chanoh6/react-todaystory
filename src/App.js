import { Outlet } from 'react-router-dom';
import { TodaystoryApiProvider } from './context/TodaystoryApiContext';
import './styles/App.css';

function App() {
  return (
    <>
      <TodaystoryApiProvider>
        <Outlet />
      </TodaystoryApiProvider>
    </>
  );
}

export default App;
