/** @jsx jsx */
import { jsx, Box, Text } from 'theme-ui'
import { Location } from '@reach/router'

import SEO from '../components/seo'

const LibraryHomePage = () => {
  return (
    <Box>
      <SEO title="Library Home" />

      <Text>Library home</Text>

      <Location>
        {({ location }) => (
          <div>
            {location.pathname}
            {console.log({ location })}
          </div>
        )}
      </Location>
    </Box>
  )
}

export default LibraryHomePage
