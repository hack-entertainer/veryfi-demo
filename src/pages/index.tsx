import * as React from "react"

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Data from "../components/data";

import axios from 'axios';
import { useQuery } from '@tanstack/react-query'
import { Alert, Tabs } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

import Layout from "../components/layout"
import Seo from "../components/seo"

import BarChartComponent from "../components/charts/barchart";
import PieChartComponent from "../components/charts/piechart";

const IndexPage = () => {
  const startDate = useSelector((state: any) => state.config.startDate);
  const endDate = useSelector((state: any) => state.config.endDate);
  const apiKey = useSelector((state: any) => state.config.apiKey);
  const userName = useSelector((state: any) => state.config.userName);
  const clientId = useSelector((state: any) => state.config.clientId);

  const [rawData, setRawData] = React.useState({});
  const authorization = `apikey ${userName}:${apiKey}`;
  const { isError, error, isFetching, refetch } =
    useQuery({
      queryKey: ['documents'],
      queryFn: () => {
        //this is a kludge to get around CORS (especially on gatsby cloud)
        return axios.get('http://localhost:8080/https://api.veryfi.com/api/v8/partner/documents', {
          headers: {
            Authorization: authorization,
            'CLIENT-ID': clientId,
            Accept: 'application/json',
          },
          params: { date__gte: startDate, date__lte: endDate }
        })
      },
      onError: error => console.error('error fetching data', error),
      onSuccess: async data => {
        await setRawData(data);
      },
      staleTime: Infinity,
    });


  //for tabs
  const [tab, setTab] = useState('1');
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return <Layout>
    <h1>
      Welcome to <b>VeryFi Demo!</b>
    </h1>

    <TabContext value={tab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

        {isFetching &&
          <Alert severity="info">Data loading. Please wait</Alert>}
        {isError && !isFetching &&
          <Alert severity="error">Error requesting data. {error.message}. Make sure you have correct credentials</Alert>}

        <Tabs value={tab} variant="fullWidth" sx={{
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap',
          },
        }} onChange={handleTabChange}>
          <Tab label="Totals" value="1" />
          <Tab label="Categories" value="2" />
          <Tab label="Data" value="3" />
        </Tabs>
      </Box>
      <TabPanel value="1">
        <BarChartComponent isFetching={isFetching} data={rawData} />
      </TabPanel>
      <TabPanel value="2"><PieChartComponent isFetching={isFetching} data={rawData} /></TabPanel>
      <TabPanel value="3"><Data refetch={() => refetch()} /></TabPanel>
    </TabContext>

  </Layout >
}

export const Head = () => <Seo title="Home" description={undefined} children={undefined} />

export default IndexPage

