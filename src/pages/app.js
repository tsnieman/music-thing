/** @jsx jsx */
import { jsx, Flex } from 'theme-ui'
import { Router } from '@reach/router'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Library from '../components/Library'

const AppPage = () => {
  return (
    <Layout
      as={Flex}
      sx={{
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <SEO title="App" />

      <Router
        basepath="/app"
        sx={{
          flex: 1,

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
