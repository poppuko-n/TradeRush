import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [askPrice, setAskPrice] = useState();
  const [bidPrice, setBidPrice] = useState();

  useEffect(() => {
    const fetchData = () => {
      axios.get('/api/public/v1/ticker')
        .then((response) => {
          const usdJpy = response.data.data.find(item => item.symbol === 'USD_JPY');
          setAskPrice(usdJpy.ask);
          setBidPrice(usdJpy.bid);
        })
        .catch((error) => {
          console.error('API取得エラー:', error);
        });
    };

    fetchData(); 

    const intervalId = setInterval(fetchData, 1000); 

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

export default App;
