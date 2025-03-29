import { useState, useEffect } from 'react';
import ApiAction from './lib/ApiAction'

function TradeAction() {
  const [askPrice, setAskPrice] = useState();
  const [bidPrice, setBidPrice] = useState();

  useEffect(() => {
    const fetchData = () => {
      ApiAction.fetchExchange()
               .then((response) => {
                setAskPrice(response.ask)
                setBidPrice(response.bid)
               })
    };
    // NOTE: 初期設定。
    fetchData(); 
    // NOTE: 1秒間に１度買値と売値を取得し、状態変数を更新する。
    const intervalId = setInterval(fetchData, 1000); 
    // NOTE: コンポーネントがアンマウントされたときに、インターバルを解除して不要な通信を止める。
    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className="text-xl p-6 text-center">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">USD/JPY レート</h1>
      <p>Ask: <span className="text-green-500">{askPrice}</span></p>
      <p>Bid: <span className="text-red-500">{bidPrice}</span></p>
    </div>
  );
}

export default TradeAction;
