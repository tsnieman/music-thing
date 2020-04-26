/** @jsx jsx */
import { jsx, Grid } from 'theme-ui'
import { Router } from '@reach/router'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Library from '../components/Library'

const AppPage = () => {
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
