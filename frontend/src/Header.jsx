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
    <header className="w-full flex justify-between items-center px-2 py-3 bg-gray-100 shadow-lg">
      <div className="bg-gray-800 text-white px-6 py-1 rounded-md border-white border">
        <h1 className="text-2xl font-bold tracking-wide">Trade Rush</h1>
      </div>

      <button
        onClick={onLogout}
        className="border border-gray-900 text-gray-900 font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition duration-150"
      >
        ログアウト
      </button>
    </header>
  );
};

export default Header;
