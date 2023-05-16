import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import BarChartComponent from "../components/charts/barchart";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Config from "../components/config";

import { receipts } from '../response.js';

import axios from 'axios';
//react query
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

const IndexPage = () => {
  const vendorData = {};

  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/tannerlinsley/react-query').then(
        (res) => res.json(),
      ),
    onSuccess: (data) => console.log('SUCCESS now!', data)
  })

  console.log(axios.get('http://localhost:8080/https://google.com'));


  receipts.documents.forEach(receipt => {
    if (receipt.vendor.name in vendorData) {
      vendorData[receipt.vendor.name].total += receipt.total;
    } else {
      vendorData[receipt.vendor.name] = { total: receipt.total };
    }
  });

  console.log(vendorData);

  //for tabs
  const [tab, setTab] = React.useState('1');
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Layout>
      <div>
        <h1>
          Welcome to <b>VeryFi Demo!</b>
        </h1>

        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleTabChange} aria-label="lab API tabs example">
              <Tab label="Bar Chart" value="1" />
              <Tab label="Another Chart" value="2" />
              <Tab label="Config" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <BarChartComponent data={vendorData} />
          </TabPanel>
          <TabPanel value="2">Another Chart</TabPanel>
          <TabPanel value="3"><Config /></TabPanel>
        </TabContext>



      </div>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" description={undefined} children={undefined} />

export default IndexPage

