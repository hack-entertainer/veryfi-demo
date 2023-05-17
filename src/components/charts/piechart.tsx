import { Alert } from '@mui/material';
import * as React from 'react';

import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PieChartComponent = ({ isFetching, data }: any) => {
  //making sure data is fetched
  if (!data.data || !data.data.documents || Object.keys(data).length === 0) {
    return <>
      {!isFetching && <Alert severity="warning">Fetch Data in Data Tab</Alert>}
    </>
  }

  // const vendorData = {};
  // data.data.documents.forEach(receipt => {
  //   if (receipt.vendor.name in vendorData) {
  //     vendorData[receipt.vendor.name].total += +((Math.round(receipt.total * 100) / 100).toFixed(2));
  //   } else {
  //     vendorData[receipt.vendor.name] = { total: receipt.total };
  //   }
  // })

  const categoryData = {};
  data.data.documents.forEach(receipt => {
    if (receipt.vendor.category in categoryData) {
      categoryData[receipt.vendor.category].total += +((Math.round(receipt.total * 100) / 100).toFixed(2));
    } else {
      categoryData[receipt.vendor.category] = { total: receipt.total };
    }
  })

  const displayData: any = [];
  for (const key of Object.keys(categoryData)) {
    displayData.push({ name: key, total: categoryData[key].total, value: categoryData[key].total });
  }
  displayData.sort((a, b) => a.name.localeCompare(b.name));


  const COLORS = ['#55DDE0', '#F6AE2D', '#F26419', '#FFA9E7'];
  const data01 = [
    {
      "name": "Group A",
      "value": 400
    },
    {
      "name": "Group B",
      "value": 300
    },
    {
      "name": "Group C",
      "value": 300
    },
    {
      "name": "Group D",
      "value": 200
    },
    {
      "name": "Group E",
      "value": 278
    },
    {
      "name": "Group F",
      "value": 189
    }
  ];
  const data02 = [
    {
      "name": "Group A",
      "value": 2400
    },
    {
      "name": "Group B",
      "value": 4567
    },
    {
      "name": "Group C",
      "value": 1398
    },
    {
      "name": "Group D",
      "value": 9800
    },
    {
      "name": "Group E",
      "value": 3908
    },
    {
      "name": "Group F",
      "value": 4800
    }
  ];

  // console.log(data01);
  console.log(displayData);
  // console.log(data);
  // console.log(categoryData);

  return <>
    <ResponsiveContainer width="100%" height={500}>
      <PieChart width={800} height={500}>
        {/* <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label >
          {data01.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Tooltip></Tooltip>
        </Pie> */}


        {/* <Pie data={displayData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label > */}
        <Pie data={displayData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label={({
          cx,
          cy,
          midAngle,
          innerRadius,
          outerRadius,
          value,
          index
        }) => {
          console.log("handling label?");
          const RADIAN = Math.PI / 180;
          // eslint-disable-next-line
          const radius = 25 + innerRadius + (outerRadius - innerRadius);
          // eslint-disable-next-line
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          // eslint-disable-next-line
          const y = cy + radius * Math.sin(-midAngle * RADIAN);

          return (
            <text
              x={x}
              y={y}
              fill="#8884d8"
              textAnchor={x > cx ? "start" : "end"}
              dominantBaseline="central"
            >
              {displayData[index].name} ({value})
            </text>
          );
        }} >
          {displayData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Tooltip></Tooltip>
        </Pie>


        {/* <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label /> */}
        {/* <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}


      </PieChart>
    </ResponsiveContainer>
  </>;
};


export default PieChartComponent