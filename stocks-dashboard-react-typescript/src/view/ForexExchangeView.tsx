import React, { useEffect, useState } from 'react';
import { FxIntraDayView } from '../components/currencyViews/FxIntraDayView';
import { FxDailyView } from '../components/currencyViews/FxDailyView';
import { FxMonthlyView } from '../components/currencyViews/FxMonthly';
import { parseDataFx } from '../utils/helperFunctions/parseData';

import { SearchParametersFxViews, ResponseDataFx } from '../utils/interfaces';

import { Container, MenuItem, Select } from '@material-ui/core';
import { FxWeeklyView } from '../components/currencyViews/FxWeeklyView';
//import { Loading } from '../components/loader/Loading';

const ForexExchangeView: React.FC = () => {
  const [searchParamters, setSearchParamaters] = useState<
    SearchParametersFxViews
  >({
    func: 'FX_INTRADAY',
    to_symbol: 'USD',
    from_symbol: 'EUR',
  });
  const [resData, setResData] = useState<ResponseDataFx | undefined>();
  const [dataXAxis, setDataXAxis] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    const fetchData = async (
      func: string = 'FX_INTRADAY',
      from_symbol: string = 'USD',
      to_symbol: string = 'EUR'
    ) => {
      const url = `https://www.alphavantage.co/query?function=${func}&from_symbol=${from_symbol}&to_symbol=${to_symbol}&interval=5min&apikey=demo`;
      const rawData = await fetch(url);
      const jsonData = await rawData.json();

      const { apiData, chartXAxis } = parseDataFx(jsonData);

      setDataXAxis(chartXAxis);

      setResData(apiData);
    };
    fetchData(
      searchParamters.func,
      searchParamters.from_symbol,
      searchParamters.to_symbol
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

  //TODO need to pass the search and data to the components below to be rendered
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
        {cryptoView}
      </div>
    </Container>
  );
};

export default ForexExchangeView;
