/** @jsx jsx */
import { jsx, Box, Flex, Grid } from 'theme-ui'
import { Router } from '@reach/router'

import SEO from '../components/seo'

import NavControls from '../components/NavControls'
import NowPlaying from '../components/NowPlaying'
import Playlist from '../components/Playlist'

import AlbumGrid from '../components/AlbumGrid'
import LibraryHome from '../components/LibraryHome'
import Artists from '../components/Artists'

const LibraryPage = () => {
  return (
    <Flex
      sx={{
        flex: 1,
        flexDirection: 'column',
        maxHeight: '100%',
      }}
    >
      <SEO title="App" />

      <Grid
        as="main"
        gap={0}
        columns="30ch 1fr 30ch"
        sx={{
          flex: '1 1 auto',
          maxHeight: '100%',
          minHeight: 0,

          '& > *': {
            minHeight: 0,
            overflow: 'auto',
          },
        }}
      >
        <Flex as="nav" sx={{ '& > *': { width: '100%' } }}>
          <NavControls />
        </Flex>

        <Flex bg="muted" sx={{ flexDirection: 'column' }}>
          <Router
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '100%',
            }}
          >
            <AlbumGrid
              path="/albums"
              as={Flex}
              sx={{
                flex: 1,
                flexDirection: 'column',
                maxHeight: '100%',
              }}
            />

            <Artists path="/artists" />

            <LibraryHome path="/" />
          </Router>
        </Flex>

        <Box
          sx={{
            borderLeft: '1px solid',
            borderColor: 'border',
          }}
        >
          <Box
            sx={{
              // position: 'relative'
              position: 'sticky',
              top: 0,

              // Hack so that Draggables dont show above this.
              zIndex: 9999, // TODO use variable.
            }}
          >
            <NowPlaying />
          </Box>

          <Box pb={5}>
            <Playlist />
          </Box>
        </Box>
      </Grid>
    </Flex>
  )
}

export default LibraryPage
