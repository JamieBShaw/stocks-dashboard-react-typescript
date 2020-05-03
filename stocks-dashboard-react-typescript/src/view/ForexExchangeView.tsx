import React, { useEffect, useState } from 'react';
import { CurrencyExchangeView } from '../components/currencyViews/CurrencyExchangeView';
import { FxIntraDayView } from '../components/currencyViews/FxIntraDayView';
import { FxDailyView } from '../components/currencyViews/FxDailyView';
import { FxMonthlyView } from '../components/currencyViews/FxMonthly';
import { parseDataCurrencyExchange } from '../utils/helperFunctions/parseData';

import { SearchParamtersCrypto, ResponseDataCrypto } from '../utils/interfaces';

import { Container, MenuItem, Select } from '@material-ui/core';
import { FxWeeklyView } from '../components/currencyViews/FxWeeklyView';
//import { Loading } from '../components/loader/Loading';

const ForexExchangeView: React.FC = () => {
  const [searchParamters, setSearchParamaters] = useState<
    SearchParamtersCrypto
  >({
    func: 'CURRENCY_EXCHANGE_RATE',
    from_currency: 'BTC',
    to_currency: 'CNY',
  });
  const [resData, setResData] = useState<ResponseDataCrypto | undefined>();
  const [dataXAxis, setDataXAxis] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    const fetchData = async (
      func: string = 'CURRENCY_EXCHANGE_RATE',
      from_currency: string = 'BTC',
      to_currency: string = 'CNY'
    ) => {
      const url = `https://www.alphavantage.co/query?function=${func}&from_currency=${from_currency}&to_currency=${to_currency}&apikey=demo`;
      const rawData = await fetch(url);
      const jsonData = await rawData.json();

      const { apiData, chartXAxis } = parseDataCurrencyExchange(jsonData);

      console.log(jsonData);
      setDataXAxis(chartXAxis);

      setResData(apiData);
    };
    fetchData(
      searchParamters.func,
      searchParamters.from_currency,
      searchParamters.to_currency
    );
  }, [searchParamters]);

  const handleSearchParameterChange = (e: any) => {
    setSearchParamaters({
      ...searchParamters,
      [e.target.name]: e.target.value,
    });
  };

  console.log('RES_DATA: ' + resData);
  console.log('X-AXIS: ' + dataXAxis);

  let cryptoView;
  switch (searchParamters.func) {
    case 'FT_INTRADAY':
      cryptoView = <FxIntraDayView />;
      break;
    case 'FX_DAILY':
      cryptoView = <FxDailyView />;
      break;
    case 'FX_WEEKLY':
      cryptoView = <FxWeeklyView />;
      break;
    case 'FX_MONTHLY':
      cryptoView = <FxMonthlyView />;
      break;
  }

  return (
    <Container
      style={{
        marginLeft: '100px',
        padding: '24px',
        textAlign: 'center',
        justifyItems: 'center',
      }}
    >
      <Select
        variant="outlined"
        name="intervals"
        value={searchParamters.func}
        onChange={handleSearchParameterChange}
      >
        <MenuItem value={'FX_INTRADAY'}>FX Intra Day</MenuItem>
        <MenuItem value={'FX_DAILY'}>FX Daily</MenuItem>
        <MenuItem value={'FX_WEEKLY'}>FX Weekly</MenuItem>
        <MenuItem value={'FX_MONTHLY'}>FX Monthly</MenuItem>
      </Select>
      <div style={{ paddingTop: '50px', paddingRight: '20px' }}>
        <CurrencyExchangeView
          to_currency={searchParamters.to_currency}
          from_currency={searchParamters.from_currency}
          func={searchParamters.func}
          exchange_rate={resData!.exchange_rate}
          handleSearchParameterChange={handleSearchParameterChange}
        />

        {cryptoView}
      </div>
    </Container>
  );
};

export default ForexExchangeView;
