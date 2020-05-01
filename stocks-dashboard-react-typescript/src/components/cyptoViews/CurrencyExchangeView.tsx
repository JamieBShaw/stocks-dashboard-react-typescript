import React from 'react';
import { TextField } from '@material-ui/core';

interface IProps {
  handleSearchParameterChange: (e: any) => void;
  from_currency: string;
  to_currency: string;
  func: string;
  exchange_rate: string;
}

export const CurrencyExchangeView: React.FC<IProps> = ({
  func,
  handleSearchParameterChange,
  to_currency,
  from_currency,
  exchange_rate,
}) => {
  let currencyView;
  if (func === 'CURRENCY_EXCHANGE_RATE') {
    currencyView = (
      <>
        <TextField
          size="medium"
          type="search"
          variant="outlined"
          name="from_currency"
          value={from_currency}
          onChange={handleSearchParameterChange}
        ></TextField>
        <TextField
          variant="outlined"
          name="to_currency"
          value={to_currency}
          onChange={handleSearchParameterChange}
        ></TextField>
        <TextField variant="outlined" disabled value={exchange_rate}>
          {exchange_rate}
        </TextField>
      </>
    );
  } else {
    currencyView = null;
  }
  return <>{currencyView}</>;
};
