import * as React from "react"
import { Link } from "gatsby"

import DataObjectIcon from '@mui/icons-material/DataObject';
import { Typography } from "@mui/material";

const Header = ()=> (<>
  <header
    style={{
      margin: `0 auto`,
      padding: `var(--space-4) var(--size-gutter)`,
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
    }}
  >
    <Link
      to="https://www.veryfi.com/"
      style={{
        fontSize: `var(--font-sm)`,
        textDecoration: `none`,
      }}
    >
      {/* {siteTitle} */}
      <Typography>VeryFi API</Typography>
    </Link>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Typography>VeryFi Demo</Typography>
      <DataObjectIcon />
    </div>
  </header>
</>)

export default Header
