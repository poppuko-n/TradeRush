import { useState} from 'react';
import TradeAction from './TradeAction';
import Home from './Home';
import Modal from './Modal';
import SignUp from './SignUp.jsx';
import SignIn from './SignIn';
import Header from './Header';

const App = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  return(
    <>
    <Home
      setIsSignUp={setIsSignUp}
      setIsSignIn={setIsSignIn}
     />

    {/* NOTE: 新規登録をする場合に登録画面をモーダルで表示する。 */}
    {isSignUp &&
    <Modal onBack={() => setIsSignUp(false)}>
    <SignUp onBack={() => setIsSignUp(false)} />
    </Modal>
    }
    
    {/* NOTE: ログインをする場合に登録画面をモーダルで表示する。 */}
    {isSignIn &&
    <Modal onBack={() => setIsSignIn(false)}>
    <SignIn onBack={() => setIsSignIn(false)} />
    </Modal>
    }

    <Header />

    <TradeAction />
    </>
  )
};

export default App;