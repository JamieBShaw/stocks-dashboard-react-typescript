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
//interface MetaData {
//  information: string;
//  symbol: string;
//  lastRefreshed: string;
//  outputSize: string;
//  timeZone: string;
//}

export interface SearchParamters {
  symbol: string;
  intervals: string;
  timeSeriesType: string;
}
export interface ResponseData {
  openData: string[];
  highData: string[];
  lowData: string[];
  closeData: string[];
  volumeData: string[];
}

