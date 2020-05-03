export interface IAppBarProps {
  // toggleDrawer: () => void;
}
export interface ApiData {
  '1. open': string[];
  '2. high': string[];
  '3. low': string[];
  '4. close': string[];
  '5. volume': string[];
}

// For the currecny view component
export interface SearchParamtersCurrencyView {
  func: string;
  from_currency: string;
  to_currency: string;
}

export interface ResponseDataCurrencyView {
  from_currency_code: string;
  from_currency_name: string;
  to_currency_code: string;
  to_currency_name: string;
  exchange_rate: string;
  last_refreshed: string;
  time_zone: string;
  bid_price: string;
  ask_price: string;
}
//

// For the FX echange view and componets
export interface SearchParametersFxViews {
  func: string;
  from_symbol: string;
  to_symbol: string;
}

export interface ResponseDataFx {}

//

export interface ResponseDataStocks {
  openData: string[];
  highData: string[];
  lowData: string[];
  closeData: string[];
  volumeData: string[];
}

export interface SearchParamtersStocks {
  symbol: string;
  intervals: string;
  timeSeriesType: string;
}
