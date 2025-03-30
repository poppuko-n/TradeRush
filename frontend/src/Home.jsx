import homeImage from './assets/home.jpg';

const Home = ({ setIsSignUp, setIsSignIn }) => {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <img
        src={homeImage}
        alt="Home"
        className="w-full h-full object-cover absolute top-0 left-0 z-0"
      />
      <div className="bg-black bg-opacity-60 w-full h-full absolute top-0 left-0 z-10" />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-20">
        <h1 className="text-5xl font-bold mb-6">Trade Rush</h1>
        <div>
          <button className="
            bg-white text-black px-6 py-3 mr-4 rounded-lg text-base font-semibold
            hover:bg-blue-500 hover:text-white transition duration-300
          "
          onClick={() => {setIsSignUp(true)}}>
            新規登録
          </button>
          <button className="
            bg-transparent text-white px-6 py-3 border-2 border-white rounded-lg text-base font-semibold
            hover:bg-blue-500 hover:text-white transition duration-300
          "
          onClick={() => {setIsSignIn(true)}}>
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
