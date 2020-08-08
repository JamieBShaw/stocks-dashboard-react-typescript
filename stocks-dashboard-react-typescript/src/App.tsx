import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApplicationBar from './components/applicationBar/ApplicationBar';
import LeftDrawer from './components/leftDrawer/LeftDrawer';
import ForexExchangeView from './view/ForexExchangeView';
import HomeView from './view/HomeView';
import StockTimeSeriesView from './view/StockTimeSeriesView';

function App() {
  return (
    <Router>
      <ApplicationBar />
      <LeftDrawer />
      <Route exact path="/" component={HomeView} />
      <Route exact path="/stocks" component={StockTimeSeriesView} />
      <Route exact path="/forex" component={ForexExchangeView} />
    </Router>
  );
}
export default App;

