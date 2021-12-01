import SessionContextProvider from '../Context/SessionContext';
import Login from './Login';

function App() {
  return (
    <SessionContextProvider>
      <div>
        <Login />
      </div>
    </SessionContextProvider>
  );
}

export default App;
