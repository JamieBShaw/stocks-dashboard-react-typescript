import { ResponseDataStocks, ResponseDataCrypto } from '../interfaces';

let chartXAxis: string[] = [];

export const parseDataStocks = (data: any, interval: string) => {
  let apiData: ResponseDataStocks | undefined = {
    openData: [],
    highData: [],
    lowData: [],
    closeData: [],
    volumeData: [],
  };

  for (var key in data[`Time Series (${interval})`]) {
    chartXAxis.push(key);

    apiData.openData.push(data[`Time Series (${interval})`][key]['1. open']);
    apiData.highData.push(data[`Time Series (${interval})`][key]['2. high']);
    apiData.lowData.push(data[`Time Series (${interval})`][key]['3. low']);
    apiData.closeData.push(data[`Time Series (${interval})`][key]['4. close']);
    apiData.volumeData.push(
      data[`Time Series (${interval})`][key]['5. volume']
    );
  }

  return {
    apiData,
    chartXAxis,
  };
};

export const parseDataCurrencyExchange = (data: any) => {
  let apiData: ResponseDataCrypto | undefined = {
    ask_price: '',
    bid_price: '',
    time_zone: '',
    exchange_rate: '',
    last_refreshed: '',
    to_currency_code: '',
    to_currency_name: '',
    from_currency_code: '',
    from_currency_name: '',
  };

  apiData.from_currency_name =
    data['Realtime Currency Exchange Rate']['2. From_Currency Name'];
  apiData.from_currency_code =
    data['Realtime Currency Exchange Rate']['1. From_Currency Code'];
  apiData.to_currency_name =
    data['Realtime Currency Exchange Rate']['4. To_Currency Name'];
  apiData.to_currency_code =
    data['Realtime Currency Exchange Rate']['3. To_Currency Code'];
  apiData.exchange_rate =
    data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
  apiData.last_refreshed =
    data['Realtime Currency Exchange Rate']['6. Last Refreshed'];
  apiData.time_zone = data['Realtime Currency Exchange Rate']['7. Time Zone'];
  apiData.bid_price = data['Realtime Currency Exchange Rate']['8. Bid Price'];
  apiData.ask_price = data['Realtime Currency Exchange Rate']['9. Ask Price'];

  return { apiData, chartXAxis };
};
