/** @jsx jsx */
import { useEffect, useState } from 'react'
import { jsx, Box, Grid, Text } from 'theme-ui'
import { Router } from '@reach/router'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Library from '../components/Library'

const AppPage = () => {
  // Since `/app/*` pages are client-side only (unlike other gatsby pages), this
  // is used to detect whether the page is still loading or not to avoid
  // flashing the wrong page when landing on a `/app/*` route.
  const [isClient, setClient] = useState(false)
  useEffect(() => {
    setClient(true)
  }, [])
  if (!isClient) {
    return (
      <Box>
        <Text>Loading...</Text>
      </Box>
    )
  }

  return (
    <Layout
      as={Grid}
      sx={{
        height: '100%',
        gridTemplateRows: 'min-content 1fr',
        rowGap: 0,
      }}
    >
      <SEO title="App" />

      <Router
        basepath="/app"
        sx={{
          display: 'grid',
          gridTemplateRows: 'minmax(0, 1fr)', // overflow: auto hack
          rowGap: 0,

          /* TODO not sure why this overflow is required */
          overflow: 'hidden',
        }}
      >
        <Library path="/*" />
      </Router>
    </Layout>
  )
}

export default AppPage
