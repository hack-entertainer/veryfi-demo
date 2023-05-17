import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import BarChartComponent from "../components/charts/barchart";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Data from "../components/data";

import { receipts } from '../response.js';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query'
import { Alert, Tabs } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const IndexPage = () => {
  const startDate = useSelector((state: any) => state.config.startDate);
  const endDate = useSelector((state: any) => state.config.endDate);
  const [veryfiData, setVeryfiData] = React.useState({});

  const { isError, error, isFetching, refetch } =
    useQuery({
      queryKey: ['documents'],
      queryFn: () => {
        console.log('fetching data', startDate);
        return axios.get('http://localhost:8080/https://api.veryfi.com/api/v8/partner/documents', {
          headers: {
            Authorization: `apikey hack.entertainer:96c027d3756dcbb4614c47bf984c5d7a`,
            'CLIENT-ID': 'vrfGZkf0WuI4v61YTbsOEUinJ3YSrCEfffF1keo',
            Accept: 'application/json',
          },
          params: { date__gte: startDate, date__lte: endDate }
        })
      },
      onError: error => console.error('error fetching data', error),
      onSuccess: data => {
        console.log('raw fetch', data);
        const vendorData = {};
        console.log('fetched!');
        data.data.documents.forEach(receipt => {
          if (receipt.vendor.name in vendorData) {
            vendorData[receipt.vendor.name].total += +((Math.round(receipt.total * 100) / 100).toFixed(2));
          } else {
            vendorData[receipt.vendor.name] = { total: receipt.total };
          }
        })
        setVeryfiData(vendorData);
        console.log('data fetched', vendorData);
      },
      staleTime: Infinity,
      // cacheTime: Infinity
    });


  //for tabs
  const [tab, setTab] = useState('1');
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return <>
    {/* <Layout> */}

    <h1>
      Welcome to <b>VeryFi Demo!</b>
    </h1>

    <TabContext value={tab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

        {isFetching &&
          <Alert severity="info">Data loading. Please wait</Alert>}
        {isError &&
          <Alert severity="error">Error requesting data.</Alert>}

        <Tabs value={tab} variant="fullWidth" sx={{
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
          },
        }} onChange={handleTabChange}>
          <Tab label="Totals" value="1" />
          <Tab label="Another Chart" value="2" />
          <Tab label="Data" value="3" />
        </Tabs>
      </Box>
      <TabPanel value="1">
        <BarChartComponent data={veryfiData} />
      </TabPanel>
      <TabPanel value="2">Another Chart</TabPanel>
      <TabPanel value="3"><Data refetch={() => refetch()} /></TabPanel>
    </TabContext>

    {/* </Layout > */}
  </>
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" description={undefined} children={undefined} />

export default IndexPage

