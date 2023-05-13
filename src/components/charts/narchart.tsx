import * as React from 'react';

import { BarChart, Bar, Tooltip, XAxis, YAxis } from 'recharts';

const NarChartComponent = ({ data }: any) => {

  const chartData: any = [];
  console.log('data', data);
  for (const key of Object.keys(data)) {
    chartData.push({ name: key, total: data[key].total });
  }
  chartData.sort((a, b) => a.name.localeCompare(b.name));

  return <>
    <BarChart width={600} height={500} data={chartData}>
      <Bar dataKey="total" fill="#8884d8" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </BarChart>
  </>;
};


export default NarChartComponent