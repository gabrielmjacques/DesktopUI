import { useState } from 'react';
import './App.scss';
import LockScreen from './components/LockScreen';
import Desktop from './components/Desktop';
import { WindowProvider } from './providers/WindowProvider';

function App() {

  const [systemProps, setSystemProps] = useState({
    loggedIn: false,
    btClassName: 'black-transition'
  });

  const logged = () => {
    setSystemProps(prev => ({
      ...prev,
      btClassName: 'black-transition fade'
    }));

    setTimeout(() => {
      setSystemProps(prev => ({
        ...prev,
        loggedIn: true
      }));
    }, 500);
  };

  return (
    <>
      <div className={systemProps.btClassName}></div>

      {
        // !systemProps.loggedIn &&
        // <LockScreen logged={logged} />
      }


      {
        // systemProps.loggedIn &&
        <WindowProvider>
          <Desktop />
        </WindowProvider>
      }
    </>
  );
}

export default App;
