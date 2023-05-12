import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { receipts } from '../response.js';


import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const data = [
  { name: 'Page A', uv: 400, pv: 400, amt: 2400 },
  { name: 'Page B', uv: 500, pv: 400, amt: 2500 },
  { name: 'Page C', uv: 600, pv: 400, amt: 2400 },
  { name: 'Page D', uv: 700, pv: 400, amt: 2300 },
  { name: 'Page E', uv: 800, pv: 400, amt: 2400 },
  { name: 'Page F', uv: 900, pv: 400, amt: 2500 }
];


const IndexPage = () => {

  console.log(receipts);

  return (
    <Layout>
      <div>
        <h1>
          Welcome to <b>VeryFi Demo!</b>
        </h1>
      </div>
      <div>
      </div>

      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>

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
