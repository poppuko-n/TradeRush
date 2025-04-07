import { useState, useEffect } from 'react';
import ApiAction from './lib/ApiAction';
import Modal from './Modal'; 

// NOTE: 価格を整数部分と小数点以下に分ける
const formatPrice = (price) => {
  const [integer, decimal] = price.toString().split('.');
  return { integer, decimal };
}

const TradeAction = () => {
  const [askPrice, setAskPrice] = useState(0);
  const [bidPrice, setBidPrice] = useState(0);
  const [handleAskPrice, setHandAskPrice] = useState("");
  const [handleBidPrice, setHandBidPrice] = useState("");
  const [isTrade, setIsTrade] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

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

  // NOTE: 損益額の計算
  const displayProfitLoss = handleAskPrice - bidPrice;
  const profitLoss = handleAskPrice - handleBidPrice;

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
    <div className="min-h-screen bg-gray-800 font-mono text-xl text-center flex flex-col items-center space-y-6">
  
      {/* NOTE: 取引中メッセージ */}
      <div className="w-full h-10 flex items-center justify-center">
        {isTrade && (
          <div className="bg-red-500 text-white text-lg font-semibold px-4 py-1 rounded">
            取引中
          </div>
        )}
      </div>
  
      <div className="flex justify-center space-x-16">
        {/* NOTE: 売値表示 */}
        <div className="mb-4">
          <div className="flex flex-col items-center text-white border border-green-500 rounded-full p-10 w-[220px] h-[220px] justify-center space-y-2">
            <div className="flex flex-col items-center">
              <span className="text-3xl">{formattedAsk.integer}.</span>
              <span className="text-7xl border-b border-white w-[130px] text-center mt-2 pb-2">{formattedAsk.decimal}</span>
            </div>
            <p className="text-green-500 font-semibold text-center">Bid / 売値</p>
          </div>
        </div>

  
        {/* NOTE: 買値表示 */}
        <div className="mb-4">
          <div className='flex flex-col items-center text-white border border-red-500 rounded-full p-10 w-[220px] h-[220px] justify-center space-y-2 '>
            <div className="flex flex-col items-center ">
              <span className="text-3xl">{formattedBid.integer}.</span>
              <span className="text-7xl border-b border-white w-[130px] text-center mt-2 pb-2">{formattedBid.decimal}</span>
            </div>
            <p className="text-red-500 font-semibold mt-1">Ask / 買値</p>
          </div>
          </div>
      </div>
  
      {/* NOTE: 損益額表示（トレード中のみ） */}
      {isTrade && (
        <p className="text-2xl font-bold text-white">
          損益額: <span className={displayProfitLoss >= 0 ? 'text-blue-600' : 'text-red-600'}>
            {displayProfitLoss.toFixed(2)} 円
          </span>
        </p>
      )}
  
      {/* NOTE: 注文ボタン */}
      <div>
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
  
      {/* 損益額をモーダル表示 */}
      {isModalOpen && (
        <Modal onBack={() => setIsModalOpen(false)}>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">取引結果</h2>
            <p className="text-xl">
              損益額: <span className={profitLoss >= 0 ? 'text-blue-600' : 'text-red-600'}>
                {profitLoss.toFixed(2)} 円
              </span>
            </p>
          </div>
        </Modal>
      )}
    </div>
  );  
}

export default TradeAction;