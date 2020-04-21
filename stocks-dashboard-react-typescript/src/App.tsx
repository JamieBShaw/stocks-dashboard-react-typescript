import React from 'react';
import ApplicationBar from './components/applicationBar/ApplicationBar';
import LeftDrawer from './components/leftDrawer/LeftDrawer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeView from './view/HomeView';
import StockTimeSeriesView from './view/StockTimeSeriesView';
import CryptoCurrencyView from './view/CryptoCurrenyView';

function App() {
  return (
    <Router>
      <ApplicationBar />
      <LeftDrawer />
      <Route exact path="/" component={HomeView} />
      <Route exact path="/stocks" component={StockTimeSeriesView} />
      <Route exact path="/cryptos" component={CryptoCurrencyView} />
    </Router>
  );
}
export default App;
