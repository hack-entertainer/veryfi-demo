import { Alert } from '@mui/material';
import * as React from 'react';

import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ isFetching, data }: any) => {
  if (Object.keys(data).length === 0) {
    return <>
      {!isFetching && <Alert severity="warning">Fetch Data in Data Tab</Alert>}
    </>
  }

  const vendorData = {};
  data.data.documents.forEach(receipt => {
    if (receipt.vendor.name in vendorData) {
      vendorData[receipt.vendor.name].total += +((Math.round(receipt.total * 100) / 100).toFixed(2));
    } else {
      vendorData[receipt.vendor.name] = { total: receipt.total };
    }
  })

  const displayData: any = [];
  for (const key of Object.keys(vendorData)) {
    displayData.push({ name: key, total: vendorData[key].total });
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