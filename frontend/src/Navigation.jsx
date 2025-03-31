import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import Service from './Service'
import TradeAction from './TradeAction'
import Ranking from './Ranking'

const Navigation = () => {
  return(
    <HashRouter>
      <Link to='/'>サービス概要</Link>
      <Link to='/trade'>取引</Link>
      <Link to='/ranking'>ランキング</Link>
      <Routes>
        <Route path='/' element={<Service />}></Route>
        <Route path='/trade' element={<TradeAction />}></Route>
        <Route path='/ranking' element={<Ranking />}></Route>
      </Routes>
    </HashRouter>
  );
};

export default Navigation;