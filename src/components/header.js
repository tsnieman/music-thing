import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { Box, Container, Link as TLink } from 'theme-ui'

const Header = ({ siteTitle }) => (
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
    </Container>
  </Box>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
