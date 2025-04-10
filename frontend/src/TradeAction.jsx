import { useState, useEffect } from 'react';
import ApiAction from './lib/ApiAction';
import Modal from './Modal'; 
import AddButton from './assets/add.svg';
import MinusButton from './assets/subtract_circle.svg';
import LeftMen from './assets/left_men.png';
import RightWomen from './assets/right_women.png';
import Help from './assets/help.svg';

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
  const [lot, setLot] = useState(0); 
  const [capital, setCapital] = useState(2000000);
  const [leverage, setLeverage] = useState(1);
  const [isHelp, setIsHelp] = useState(false);

  
  // NOTE:買った価格（ask）と現在の売値（bid）で損益額を算出
  const displayProfitLoss = isTrade ? (bidPrice - handleAskPrice) * lot * 1000 : 0;
  const profitLoss = (handleBidPrice - handleAskPrice) * lot * 1000;
  const margin = lot * askPrice * 1000 / leverage;
  const isTradeAction = capital >= margin;

  // NOTE: 買い注文（売る準備）
  const handleAsk = () => {
    setHandAskPrice(askPrice);
    setIsTrade(true);
  };

  // NOTE: 売り注文（損益確定）
  const handleBid = () => {
    const result = (bidPrice - handleAskPrice) * lot * 1000; 
    setHandBidPrice(bidPrice);
    setIsTrade(false);
    setCapital(prev => prev + result);
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
    <div className="flex justify-center items-center w-full gap-20">
      <img 
      src={LeftMen} 
      alt="左側の男"
      className="h-[300px] object-contain" />

      <div className="flex flex-col items-center space-y-2">

      {/* NOTE: 取引中メッセージ */}
      <div className="w-full h-10 flex items-center justify-center mt-2 mb-6">
        {isTrade && (
          <div className="w-full bg-red-500 text-white text-lg text-center font-semibold px-4 py-1 rounded">
            取引中
          </div>
        )}
      </div>
  
      <div className="flex justify-center items-start space-x-20 w-full px-4">

        <div className="flex flex-col space-y-8">
          {/* 価格表示パネル（売値） */}
          <div className="relative w-[240px] h-[240px] rounded-full bg-gradient-to-br from-green-400 to-green-700 p-[3px] shadow-lg">
            <div className="flex flex-col items-center justify-center bg-white rounded-full w-full h-full">
              <span className="text-3xl">{formattedBid.integer}.</span>
              <span className="text-7xl border-b border-black w-[130px] text-center mt-2 pb-2">{formattedBid.decimal}</span>
              <p className="text-green-500 font-semibold text-center mt-4">Bid / 売値</p>
            </div>
          </div>

          {/* 価格表示パネル（買値） */}
          <div className="relative w-[240px] h-[240px] rounded-full bg-gradient-to-br from-red-400 to-red-700 p-[3px] shadow-lg">
            <div className="flex flex-col items-center justify-center bg-white rounded-full w-full h-full">
              <span className="text-3xl">{formattedAsk.integer}.</span>
              <span className="text-7xl border-b border-black w-[130px] text-center mt-2 pb-2">{formattedAsk.decimal}</span>
              <p className="text-red-500 font-semibold text-center mt-4">Ask / 買値</p>
            </div>
          </div>

        </div>
  
        <div className="border border-black rounded-2xl py-2 px-8 flex flex-col gap-12 w-full max-w-md shadow-2xl">
        {/* 保有資産 */}
        <div className="text-2xl py-3 text-left flex justify-between w-full">
          <span className="min-w-[140px]">保有資産　：</span>
          <span className="[font-variant-numeric:tabular-nums]">
            ¥{Math.floor(capital).toLocaleString()}
          </span>
        </div>

        {/* 証拠金 */}
        <div className="text-2xl py-3 text-left flex justify-between w-full">
          <span className="min-w-[140px]">必要証拠金：</span>
          <span className="[font-variant-numeric:tabular-nums]">
            ¥{Math.floor(margin).toLocaleString()}
          </span>
        </div>

          {/* ロット数入力 */}
          <div className="w-full">
            <label className="text-xl flex items-center gap-4">
              <span>取引ロット：</span>
              <img 
              src={MinusButton} 
              alt="マイナスボタン"
              onClick={() => setLot(prev => Math.max(1, prev-1))} 
              className=' h-8 w-8 cursor-pointer bg-gray-300 rounded p-1 transition duration-700" '/>
              <input 
              type="number"
              className='w-14 text-right'
              value={lot}
              placeholder='0'
              onChange={(e)=>setLot(Number(e.target.value))}
               />
              <img 
              src={AddButton} 
              alt="プラスボタン"
              onClick={ ()=> setLot(prev=>(prev+1))}
              className='h-8 w-8 cursor-pointer bg-gray-300 rounded p-1 transition duration-700" '
              />
            </label>
          </div>

          {/* レバレッジ入力 */}
          <div className="w-full">
            <label className="text-xl flex items-center gap-4">
              <span>レバレッジ：</span>
              <img 
              src={MinusButton} 
              alt="マイナスボタン"
              onClick={() => setLeverage(prev => Math.max(1, prev-1))} 
              className=' h-8 w-8 cursor-pointer bg-gray-300 rounded p-1 transition duration-700" '/>
              <p className='w-14 text-center'>{leverage}</p>
              <img 
              src={AddButton} 
              alt="プラスボタン"
              onClick={ ()=> setLeverage(prev=> Math.min(10, prev+1))}
              className='h-8 w-8 cursor-pointer bg-gray-300 rounded p-1 transition duration-700" '
              />
            </label>
            <img
            src={Help} 
            alt="レバレッジヘルプ"
            className='ml-10 cursor-pointer'
            onClick={()=>setIsHelp(true)} />
          </div>
          
          {/* 損益額表示 */}
          <p className="text-center text-2xl text-black font-bold">
            損益額: <span className={
              displayProfitLoss > 0 
                ? 'text-red-600' 
                : displayProfitLoss < 0 
                ? 'text-blue-600'
                : 'text-black'}>
              {Math.floor(displayProfitLoss).toLocaleString()} 円
            </span>
          </p>
  
          {/* 注文ボタン */}
          <div className="flex flex-col items-center min-h-[56px] space-y-2">
            {/* 警告メッセージ */}
            <p className={`text-red-500 text-center text-sm transition-opacity duration-300 ${
              isTradeAction ? 'opacity-0' : 'opacity-100'
            }`}>
              保有資金内でロット数を選択してください。
            </p>

            {/* ボタン */}
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
                disabled={!isTradeAction}
                className={`px-6 py-2 rounded-md text-white transition ${
                  isTradeAction
                    ? 'bg-black'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                注文
              </button>
            )}
          </div>
        </div>
      </div>

      </div>


      <img 
      src={RightWomen} 
      alt="右側の女"
      className="h-[310px] object-contain" />
  
      {/* 損益額をモーダル表示 */}
      {isModalOpen && (
        <Modal onBack={() => setIsModalOpen(false)}>
          <div className="text-center">
            <h2 className="text-4xl mb-4">取引結果</h2>
            <p className="text-2xl p-2 font-bold">
              損益額: <span className={
                profitLoss > 0 
                ? 'text-red-600' 
                : profitLoss < 0
                ? 'text-blue-600'
                : 'text-black'}>
                {Math.floor(profitLoss).toLocaleString()} 円
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

      {isHelp && (
        <Modal onBack={() => setIsHelp(false)}>
          <div className="text-center px-4 py-6 space-y-4">
            <h2 className="text-2xl font-bold">レバレッジとは？</h2>
            <p className="text-base text-left leading-relaxed">
              少ない資金で大きな金額の取引ができる仕組みです。<br />
              例）レバレッジが2倍なら、10万円の資金で20万円分の取引が可能。<br />
              リターンを大きくできる一方で、損失も同様に大きくなるため注意が必要です。
            </p>
            <p className="text-base text-left font-semibold text-red-500">
              最大で10倍まで設定できます。
            </p>
            <button
              onClick={() => setIsHelp(false)}
              className="bg-gray-600 hover:bg-black text-white px-6 py-2 rounded-md mt-4"
            >
              閉じる
            </button>
          </div>
        </Modal>
      )}

    </div>
  );
  
}

export default TradeAction;