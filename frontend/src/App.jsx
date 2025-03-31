import { useContext, useState } from 'react';
import { AuthContext } from './contexts/Authcontext.jsx';
import Home from './Home';
import Modal from './Modal';
import SignUp from './SignUp.jsx';
import SignIn from './SignIn';
import Header from './Header';
import Navigation from './Navigation';

const App = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header />
          <Navigation />
        </>
      ) : (
        <>
          <Home
            setIsSignUp={setIsSignUp}
            setIsSignIn={setIsSignIn}
          />

          {isSignUp && (
            <Modal onBack={() => setIsSignUp(false)}>
              <SignUp onBack={() => setIsSignUp(false)} />
            </Modal>
          )}

          {isSignIn && (
            <Modal onBack={() => setIsSignIn(false)}>
              <SignIn onBack={() => setIsSignIn(false)} />
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default App;
