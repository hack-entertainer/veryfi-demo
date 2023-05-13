import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { receipts } from '../response.js';
import BarChartComponent from "../components/charts/barchart";

import Box from '@mui/material/Box';
const IndexPage = () => {

  const vendorData = {};
  receipts.documents.forEach(receipt => {
    if (receipt.vendor.name in vendorData) {
      vendorData[receipt.vendor.name].total += receipt.total;
    } else {
      vendorData[receipt.vendor.name] = { total: receipt.total };
    }
  });

  console.log(vendorData);

  return (
    <Layout>
      <div>
        <h1>
          Welcome to <b>VeryFi Demo!</b>
        </h1>
        <Box>
          <BarChartComponent data={vendorData} />
        </Box>
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
