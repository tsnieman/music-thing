import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import { Box, Button, Flex, Grid, Link as TLink, useColorMode } from 'theme-ui'

const Header = ({ siteTitle }) => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <Box as="header" bg="primary" p={2}>
      <Flex sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <TLink as={Link} to="/" color="white" sx={{ fontWeight: 'bold' }}>
          {siteTitle}
        </TLink>

        <Grid columns={3} gap={2} ml="auto">
          <Button as={Link} to="/app" ml={2}>
            App
          </Button>

          <Button as={Link} to="/about" ml={2}>
            About
          </Button>

          <Button
            variant={colorMode === 'default' ? 'primary' : 'secondary'}
            sx={{ cursor: 'pointer' }}
            onClick={(e) => {
              setColorMode(colorMode === 'default' ? 'dark' : 'default')
            }}
          >
            Toggle {colorMode === 'default' ? 'Dark' : 'Light'}
          </Button>
        </Grid>
      </Flex>
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
