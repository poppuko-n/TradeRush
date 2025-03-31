import { useContext } from 'react';
import { AuthContext } from './contexts/Authcontext.jsx';

const Header = () => {
  const { setToken } = useContext(AuthContext);

  const onLogout = () => {
    localStorage.removeItem('token');
    alert("ログアウトしました。");
    setToken(null);
  };

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 bg-gray-800 text-white shadow-lg">
      <h1 className="text-3xl font-bold tracking-wide">Trade Rush</h1>

      <button
        onClick={onLogout}
        className="border border-white text-white font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition duration-150"
      >
        ログアウト
      </button>
    </header>
  );
};

export default Header;
