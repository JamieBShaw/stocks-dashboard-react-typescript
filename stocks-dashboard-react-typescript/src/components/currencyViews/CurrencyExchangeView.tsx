import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import {
  SearchParamtersCurrencyView,
  ResponseDataCurrencyView,
} from '../../utils/interfaces';
import { parseDataCurrencyExchange } from '../../utils/helperFunctions/parseData';

//TODO decvide if this currency view will be its seperate view or integrated on the ForexExchangeView, currently seperated but not implemented
export const CurrencyExchangeView: React.FC = () => {
  const [searchParamters, setSearchParamaters] = useState<
    SearchParamtersCurrencyView
  >({
    func: 'CURRENCY_EXCHANGE_RATE',
    from_currency: 'BTC',
    to_currency: 'CNY',
  });
  const [resData, setResData] = useState<
    ResponseDataCurrencyView | undefined
  >();

  useEffect(() => {
    const fetchData = async (
      func: string = 'CURRENCY_EXCHANGE_RATE',
      from_currency: string = 'BTC',
      to_currency: string = 'CNY'
    ) => {
      const url = `https://www.alphavantage.co/query?function=${func}&from_currency=${from_currency}&to_currency=${to_currency}&apikey=demo`;
      const rawData = await fetch(url);
      const jsonData = await rawData.json();

      const { apiData } = parseDataCurrencyExchange(jsonData);

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

  return (
    <>
      <TextField
        size="medium"
        type="search"
        variant="outlined"
        name="from_currency"
        value={searchParamters.from_currency}
        onChange={handleSearchParameterChange}
      ></TextField>
      <TextField
        variant="outlined"
        name="to_currency"
        value={searchParamters.to_currency}
        onChange={handleSearchParameterChange}
      ></TextField>
      <TextField variant="outlined" disabled value={resData!.exchange_rate}>
        {resData!.exchange_rate}
      </TextField>
    </>
  );
};
