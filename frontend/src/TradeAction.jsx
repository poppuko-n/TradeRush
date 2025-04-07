import { useState, useEffect } from 'react';
import ApiAction from './lib/ApiAction';

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

  // NOTE: 買い注文（売る準備）
  const handleAsk = () => {
    setHandAskPrice(askPrice);
    setIsTrade(true);
  };

  // NOTE: 売り注文（損益確定）
  const handleBid = () => {
    setHandBidPrice(bidPrice);
    setIsTrade(false);
  };

  // NOTE: 損益額の計算
  const profitLoss = handleAskPrice - bidPrice;

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
    <div className="text-xl p-6 text-center flex flex-col items-center space-y-6">

      <div className="flex justify-center space-x-16">

        {/* NOTE: 売値表示 */}
        <div className="mb-4"> 
          <div className="flex flex-col items-center text-green-500">
            <span className="text-3xl">{formattedAsk.integer}.</span>
            <span className="text-7xl">{formattedAsk.decimal}</span>
          </div>
          <p className="text-green-500 font-semibold mt-1">Bid / 売値</p>
        </div>

        {/* NOTE: 買値表示 */}
        <div className="mb-4">
          <div className="flex flex-col items-center text-red-500">
            <span className="text-3xl">{formattedBid.integer}.</span>
            <span className="text-7xl">{formattedBid.decimal}</span>
          </div>
          <p className="text-red-500 font-semibold mt-1">Ask / 買値</p>
        </div>
      </div>

      {/* NOTE: 損益額表示（トレード中のみ） */}
      {isTrade && (
        <p className="text-2xl font-bold text-gray-700">
          損益額: <span className={profitLoss >= 0 ? 'text-blue-600' : 'text-red-600'}>
            {profitLoss.toFixed(2)} 円
          </span>
        </p>
      )}

      {/* NOTE: 注文ボタン */}
      <div>
        {isTrade ? (
          <button 
            onClick={handleBid}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
          >
            売る
          </button>
        ) : (
          <button 
            onClick={handleAsk}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
          >
            買う
          </button>
        )}
      </div>
    </div>
  );
}

export default TradeAction;
