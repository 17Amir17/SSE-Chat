import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SessionContextProvider from '../Context/SessionContext';
import Login from './Login';

function App() {
  return (
    <SessionContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Login />} />
          <Route path={'/chat'} element={<div></div>} />
        </Routes>
      </BrowserRouter>
    </SessionContextProvider>
  );
}

export default App;
