import { Alert } from '@mui/material';
import * as React from 'react';

import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PieChartComponent = ({ isFetching, data }: any) => {
  //making sure data is fetched
  if (!data.data || !data.data.documents || Object.keys(data).length === 0) {
    return <>
      {!isFetching && <Alert severity="warning">Fetch Data in Data Tab</Alert>}
    </>
  }
  const categoryData = {};
  data.data.documents.forEach(receipt => {
    if (receipt.vendor.category in categoryData) {
      categoryData[receipt.vendor.category].total += +((Math.round(receipt.total * 100) / 100).toFixed(2));
    } else {
      categoryData[receipt.vendor.category] = { total: +((Math.round(receipt.total * 100) / 100).toFixed(2)) };
    }
  })

  const displayData: any = [];
  for (const key of Object.keys(categoryData)) {
    displayData.push({ name: key, total: categoryData[key].total, value: categoryData[key].total });
  }
  displayData.sort((a, b) => a.total - b.total);

  const COLORS = ['#55DDE0', '#F6AE2D', '#F26419', '#FFA9E7'];

  return <ResponsiveContainer width="100%" height={500}>
    <PieChart width={800} height={500}>
      <Tooltip formatter={
        (value: string, name: string, props: any) => (+value).toFixed(2)
      } />
      <Pie data={displayData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8"  >
        {displayData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>;
};


export default PieChartComponent