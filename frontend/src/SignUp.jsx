import { useState } from 'react';

const SignUp = ({ onBack }) => {
  const [siginUpUser, setSiginUpUser] = useState({
    name: "",
    password: "",
  });

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">ログイン</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">名前</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="ユーザー名を入力"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="パスワードを入力"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          ログイン
        </button>
        <button
          onClick={onBack}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          戻る
        </button>
      </div>

    </div>
  );
};

export default SignUp;