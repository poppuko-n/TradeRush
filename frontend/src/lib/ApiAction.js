import axios from 'axios';

class ApiAction{

  // NOTE: 外部APIを用いて、買値と売値を取得する。
  static fetchExchange(){
    return axios.get('/api/forex/public/v1/ticker')
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

// NOTE: RailsAPIを用いて、新規登録を実行する。
static createUser(user){
  return axios.post('/api/backend/users', { user: user }, {
  })
  .then((response) => {
    const token = response.data.token;
    localStorage.setItem('token', token);
    alert('登録が完了しました。');
    return token
  })
  .catch((error) => {
      alert(error.response.data.errors.join('\n'));
  });
}

// NOTE: RailsAPIを用いて、ログインする。
  static signIn(user){
    return axios
      .post('/api/backend/login', user)
      .then((response)=>{
        const token = response.data.token;
        localStorage.setItem('token', token)
        alert("ログインしました。")
        return token;
      })
      .catch((error)=>{
        alert(error.response.data.error)
      })
    }
}

export default ApiAction;