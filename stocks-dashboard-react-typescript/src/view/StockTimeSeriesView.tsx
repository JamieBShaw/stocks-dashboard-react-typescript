import React, { useEffect, useState } from 'react';
import { Container, Select, MenuItem, TextField } from '@material-ui/core';
import { parseData } from '../utils/helperFunctions/parseData';
import { Line } from 'react-chartjs-2';
import { ResponseData, SearchParamters } from '../utils/interfaces';
import { Loading } from '../components/loader/Loading';

const StockTimeSeriesView: React.FC = () => {
  const [searchParamters, setSearchParamaters] = useState<SearchParamters>({
    symbol: 'IBM',
    intervals: '5min',
    timeSeriesType: 'INTRADAY',
  });
  const [resData, setResData] = useState<ResponseData | undefined>();
  const [dataXAxis, setDataXAxis] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    const fetchData = async (
      company: string = 'IBM',
      intervals: string = '5min',
      timeSeriesType: string = 'INTRADAY'
    ) => {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_${timeSeriesType}&symbol=${company}&interval=${intervals}&apikey=demo`;
      const rawData = await fetch(url);
      const jsonData = await rawData.json();

      const {
        apiData: { openData, highData, lowData, closeData, volumeData },
        chartXAxis,
      } = parseData(jsonData, intervals);

      setDataXAxis(chartXAxis);

      setResData({
        openData,
        highData,
        lowData,
        closeData,
        volumeData,
      });
    };

    fetchData(
      searchParamters.symbol,
      searchParamters.intervals,
      searchParamters.timeSeriesType
    );
  }, [searchParamters]);

  const handleSearchParameterChange = (e: any) => {
    setSearchParamaters({
      ...searchParamters,
      [e.target.name]: e.target.value,
    });
  };

  const LineChart = resData && (
    <Line
      height={250}
      width={700}
      data={{
        labels: dataXAxis,
        datasets: [
          {
            label: 'open',
            data: resData.openData,
            fill: false,
          },
          {
            label: 'high',
            data: resData.highData,
            fill: false,
          },
          {
            label: 'low',
            data: resData.lowData,
            fill: false,
          },
          {
            label: 'close',
            data: resData.closeData,
            fill: false,
          },
          {
            label: 'volume',
            data: resData.volumeData,
            fill: false,
          },
        ],
      }}
    />
  );

  return (
    <Container
      style={{
        marginLeft: '100px',
        padding: '24px',
        textAlign: 'center',
        justifyItems: 'center',
      }}
    >
      <TextField
        size="small"
        type="search"
        variant="outlined"
        name="symbol"
        value={searchParamters.symbol}
        onChange={handleSearchParameterChange}
        lang="Company ID"
      ></TextField>
      <Select
        variant="outlined"
        name="intervals"
        value={searchParamters.intervals}
        onChange={handleSearchParameterChange}
      >
        <MenuItem value={'5min'}>5 minutes </MenuItem>
        <MenuItem value={'15min'}>15 minutes </MenuItem>
        <MenuItem value={'30min'}>30 minutes </MenuItem>
        <MenuItem value={'60min'}>60 minutes </MenuItem>
      </Select>
      <Select
        variant="outlined"
        name="searchParamters"
        value={searchParamters.timeSeriesType}
        onChange={handleSearchParameterChange}
      >
        <MenuItem value={'INTRADAY'}> Intra day trade </MenuItem>
        <MenuItem value={'DAILY'}> Daily trade </MenuItem>
        <MenuItem value={'WEEKLY'}> Weekly trade </MenuItem>
        <MenuItem value={'MONTHLY'}> Monthly trade</MenuItem>
      </Select>
      {LineChart ? (
        LineChart
      ) : (
        <div style={{ paddingTop: '50px', paddingRight: '20px' }}>
          <Loading />{' '}
        </div>
      )}
    </Container>
  );
};

export default StockTimeSeriesView;
