import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SessionContextProvider from '../Context/SessionContext';
import Chat from './Chat';
import Login from './Login';

function App() {
  return (
    <SessionContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Login />} />
          <Route path={'/chat'} element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </SessionContextProvider>
  );
}

export default App;
