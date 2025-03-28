import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [askPrice, setAskPrice] = useState();
  const [bidPrice, setBidPrice] = useState();
  const BASE_URL = '/api/public/v1/ticker'; 


  useEffect(() => {
    axios.get(BASE_URL)
      .then((response) => {
        const usdJpy = response.data.data.find(item => item.symbol === 'USD_JPY');
        if (usdJpy) {
          setAskPrice(usdJpy.ask);
          setBidPrice(usdJpy.bid);
        }
      })
      .catch((error) => {
        console.error('API取得エラー:', error);
      });
  }, []);

  return (
    <div className="text-2xl font-bold text-blue-500 p-4">
      <div>Ask: {askPrice}</div>
      <div>Bid: {bidPrice}</div>
    </div>
  );
}

export default App;
