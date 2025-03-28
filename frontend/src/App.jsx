import { useState} from 'react';
import TradeAction from './TradeAction';
import Home from './Home';
import Modal from './Modal';
import SignIn from './SignIn';
import SignUp from './SignUp.jsx';

const App = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return(
    <>
    <Home
      setIsSignIn={setIsSignIn}
      setIsSignUp={setIsSignUp}
     />

    {/* NOTE: 新規登録をする場合に登録画面をモーダルで表示する。 */}
    {isSignIn &&
    <Modal onBack={() => setIsSignIn(false)}>
    <SignIn onBack={() => setIsSignIn(false)} />
    </Modal>
    }
    
    {/* NOTE: ログインをする場合に登録画面をモーダルで表示する。 */}
    {isSignUp &&
    <Modal onBack={() => setIsSignUp(false)}>
    <SignUp onBack={() => setIsSignUp(false)} />
    </Modal>
    }

    <TradeAction />
    </>
  )
};

export default App;