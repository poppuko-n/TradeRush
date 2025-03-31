import { useContext } from 'react';
import { AuthContext } from './contexts/Authcontext.jsx';

const Header = () => {
  const { setToken } = useContext(AuthContext);
  const onLogout = () => {
    localStorage.removeItem('token');
    alert("ログアウトしました。")
    setToken(null)
  }

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 bg-indigo-600 text-white shadow-md">
      <h1 className="text-3xl font-semibold">Trade Rush</h1>
      
      <button
        onClick={()=>onLogout()}
        className="bg-white text-indigo-600 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition"
      >
        ログアウト
      </button>
    </header>
  );
};

export default Header;
