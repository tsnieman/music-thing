import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { Box, Container, Link as TLink, useColorMode } from 'theme-ui'

const Header = ({ siteTitle }) => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <Box as="header" bg="primary">
      <Container>
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>

        <TLink as={Link} to="/about/" sx={{ color: 'white' }}>
          About
        </TLink>

        <button
          onClick={(e) => {
            setColorMode(colorMode === 'default' ? 'dark' : 'default')
          }}
        >
          Toggle {colorMode === 'default' ? 'Dark' : 'Light'}
        </button>
      </Container>
    </Box>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
