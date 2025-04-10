import { useState, useEffect } from 'react';
import ApiAction from './lib/ApiAction';
import Modal from './Modal'; 
import AddButton from './assets/add.svg';
import MinusButton from './assets/subtract_circle.svg';

// NOTE: 価格を整数部分と小数点以下に分ける
const formatPrice = (price) => {
  const [integer, decimal] = price.toString().split('.');
  return { integer, decimal };
}

const TradeAction = () => {
  const [askPrice, setAskPrice] = useState(0);
  const [bidPrice, setBidPrice] = useState(0);
  const [handleAskPrice, setHandAskPrice] = useState(0);
  const [handleBidPrice, setHandBidPrice] = useState(0);
  const [isTrade, setIsTrade] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lot, setLot] = useState(1); 
  
  // NOTE:買った価格（ask）と現在の売値（bid）で損益額を算出
  const displayProfitLoss = isTrade ? (bidPrice - handleAskPrice) * lot * 5000 : 0;
  const profitLoss = (handleBidPrice - handleAskPrice) * lot * 5000;
  const margin = lot * bidPrice * 5000;

  // NOTE: 買い注文（売る準備）
  const handleAsk = () => {
    setHandAskPrice(askPrice);
    setIsTrade(true);
  };

  // NOTE: 売り注文（損益確定）
  const handleBid = () => {
    setHandBidPrice(bidPrice);
    setIsTrade(false);
    setIsModalOpen(true);
  };

  useEffect(() => {
    // NOTE: APIからレートを取得
    const fetchData = () => {
      ApiAction.fetchExchange().then((response) => {
        setAskPrice(response.ask);
        setBidPrice(response.bid);
      });
    };

    // NOTE: 初回実行
    fetchData(); 
    // NOTE: 1秒ごとに更新
    const intervalId = setInterval(fetchData, 1000); 
    // NOTE: クリーンアップ
    return () => clearInterval(intervalId); 
  }, []);

  // NOTE: 表示用に整数と小数に分ける
  const formattedAsk = formatPrice(askPrice);
  const formattedBid = formatPrice(bidPrice);

  return (
    <div className="font-mono text-xl text-center flex flex-col items-center space-y-2">
      
      {/* NOTE: 取引中メッセージ */}
      <div className="w-full h-10 flex items-center justify-center mt-2">
        {isTrade && (
          <div className="w-full bg-red-500 text-white text-lg font-semibold px-4 py-1 rounded">
            取引中
          </div>
        )}
      </div>
  
      <div className="flex justify-center items-start space-x-20 w-full px-4">

        <div className="flex flex-col space-y-8">
          {/* 売値表示 */}
          <div className="flex flex-col items-center text-black border border-green-500 rounded-full p-10 w-[220px] h-[220px] justify-center space-y-2">
            <div className="flex flex-col items-center">
              <span className="text-3xl">{formattedBid.integer}.</span>
              <span className="text-7xl border-b border-black w-[130px] text-center mt-2 pb-2">{formattedBid.decimal}</span>
            </div>
            <p className="text-green-500 font-semibold text-center">Bid / 売値</p>
          </div>
  
          {/* 買値表示 */}
          <div className="flex flex-col items-center text-black border border-red-500 rounded-full p-10 w-[220px] h-[220px] justify-center space-y-2">
            <div className="flex flex-col items-center">
              <span className="text-3xl">{formattedAsk.integer}.</span>
              <span className="text-7xl border-b border-black w-[130px] text-center mt-2 pb-2">{formattedAsk.decimal}</span>
            </div>
            <p className="text-red-500 font-semibold mt-1">Ask / 買値</p>
          </div>
        </div>
  
        <div className="border border-black rounded-2xl py-4 px-8 flex flex-col gap-16 w-full max-w-md">
          {/* 保有資産 */}
          <div className="text-black text-2xl py-3 w-full text-left">
            保有資産: ¥1,000,000
          </div>
  
          {/* 必要証拠金表示 */}
          <div className="w-full">
            <p className="text-2xl text-left">
              必要証拠金：<span className="text-2xl">
                ¥{Math.floor(margin).toLocaleString()}
              </span>
            </p>
          </div>
          
          {/* ロット数入力 */}
          <div className="w-full">
            <label className="text-2xl flex items-center gap-4">
              <span>取引ロット数：</span>
              <img 
              src={MinusButton} 
              alt="マイナスボタン"
              onClick={() => setLot(prev => Math.max(1, prev-1))} 
              className=' h-8 w-8 cursor-pointer bg-gray-300 rounded p-1 transition duration-700" '/>
              <p>{lot}</p>
              <img 
              src={AddButton} 
              alt="プラスボタン"
              onClick={ ()=> setLot(prev=>(prev+1))}
              className='h-8 w-8 cursor-pointer bg-gray-300 rounded p-1 transition duration-700" '
              />
            </label>
          </div>
  
  
          {/* 損益額表示 */}
          <p className="text-2xl text-black text-left">
            損益額: <span className={
              displayProfitLoss > 0 
                ? 'text-red-600' 
                : displayProfitLoss < 0 
                ? 'text-blue-600'
                : 'text-black'}>
              {displayProfitLoss.toFixed(0)} 円
            </span>
          </p>
  
          {/* 注文ボタン */}
          <div className="text-center">
            {isTrade ? (
              <button 
                onClick={handleBid}
                className="bg-black hover:bg-gray-600 text-white px-6 py-2 rounded-md"
              >
                売却
              </button>
            ) : (
              <button 
                onClick={handleAsk}
                className="bg-black hover:bg-gray-600 text-white px-6 py-2 rounded-md"
              >
                注文
              </button>
            )}
          </div>
        </div>
      </div>
  
      {/* 損益額をモーダル表示 */}
      {isModalOpen && (
        <Modal onBack={() => setIsModalOpen(false)}>
          <div className="text-center">
            <h2 className="text-4xl mb-4">取引結果</h2>
            <p className="text-2xl p-2">
              損益額: <span className={
                profitLoss > 0 
                ? 'text-red-600' 
                : profitLoss < 0
                ? 'text-blue-600'
                : 'text-black'}>
                {profitLoss.toFixed(0)} 円
              </span>
            </p>
            <p className='text-xl'>買値：{handleAskPrice}</p>
            <p className='text-xl'>売値：{handleBidPrice}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-600 hover:bg-black text-white px-6 py-2 rounded-md mt-4">
            閉じる
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
  
}

export default TradeAction;