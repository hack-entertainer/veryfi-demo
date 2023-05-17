import { Alert } from '@mui/material';
import * as React from 'react';

import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ renderedData, isFetching, data }: any) => {
  if (Object.keys(data).length === 0) {
    return <>
      {!isFetching && <Alert severity="warning">Fetch Data in Data Tab</Alert>}
    </>
  }

  const displayData: any = [];
  for (const key of Object.keys(renderedData)) {
    displayData.push({ name: key, total: renderedData[key].total });
  }
  displayData.sort((a, b) => a.name.localeCompare(b.name));


  return <>
    <ResponsiveContainer width="100%" height={500}>
      <BarChart width={600} height={500} data={displayData}>
        <Bar dataKey="total" fill="#8884d8" />
        <XAxis dataKey="name" />
        <YAxis />
        {/* <YAxis domain={[0, 500]}/> */}
        <Tooltip formatter={
          (value: string, name: string, props: any) => (+value).toFixed(2)
        } />
      </BarChart>
    </ResponsiveContainer>
  </>;
};


export default BarChartComponent