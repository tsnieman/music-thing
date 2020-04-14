import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { ThemeProvider, Box } from 'theme-ui'
import theme from 'gatsby-plugin-theme-ui'

import Header from './header'
import './layout.css'

const Layout = ({ children, ...props }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <Box {...props}>
        <Header siteTitle={data.site.siteMetadata.title} />

        {children}
      </Box>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
