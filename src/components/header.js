import * as React from "react"

import DataObjectIcon from '@mui/icons-material/DataObject';
import { Link, Typography } from "@mui/material";

const Header = () => (<>
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
      href="https://www.veryfi.com/"
      sx={{
        fontSize: `var(--font-sm)`,
        textDecoration: `none`,
      }}>
      <Typography>VeryFi API</Typography>
    </Link>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Typography sx={{mr: .5}}>VeryFi Demo</Typography>
      <DataObjectIcon />
    </div>
  </header>
</>)

export default Header
