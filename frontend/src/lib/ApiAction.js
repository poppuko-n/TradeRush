import axios from 'axios';

class ApiAction{

  static fetchExchange(){
    return axios.get('/api/public/v1/ticker')
                .then((response) => {
                  const usdJpy = response.data.data.find(item => item.symbol === 'USD_JPY')
                  return{
                    ask: usdJpy.ask,
                    bid: usdJpy.bid
                  } 
                })
                .catch((error) => {
                  alert('データの取得に失敗しました。')
                  console.error(error);
                })
                }
}

export default ApiAction;