import { ResponseData } from '../interfaces';

export const parseData = (data: any, interval: string) => {
  // let chartOpenData: string[] = [];
  //let chartHighData: string[] = [];
  //let chartLowData: string[] = [];
  //let chartCloseData: string[] = [];
  //let chartVolumeData: string[] = [];
  let chartXAxis: string[] = [];

  let apiData: ResponseData | undefined = {
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

    //chartOpenData.push(data[`Time Series (${interval})`][key]['1. open']);
    //chartHighData.push(data[`Time Series (${interval})`][key]['2. high']);
    //chartLowData.push(data[`Time Series (${interval})`][key]['3. low']);
    //chartCloseData.push(data[`Time Series (${interval})`][key]['4. close']);
    //chartVolumeData.push(data[`Time Series (${interval})`][key]['5. volume']);
  }

  return {
    //   chartOpenData,
    //chartHighData,
    //chartLowData,
    //chartCloseData,
    //chartVolumeData,
    apiData,
    chartXAxis,
  };
};
