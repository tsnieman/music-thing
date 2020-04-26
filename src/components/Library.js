/** @jsx jsx */
import { jsx, Box, Grid } from 'theme-ui'
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
    <Grid
      sx={{
        maxHeight: '100%',
        gridTemplateRows: 'minmax(0, 1fr)', // overflow: auto hack
      }}
    >
      <SEO title="App" />

      <Grid
        as="main"
        gap={0}
        columns="30ch 1fr 30ch"
        sx={{
          '& > *': {
            overflow: 'auto',
          },
        }}
      >
        <Box
          as="nav"
          sx={{
            borderRight: '1px solid',
            borderColor: 'border',
          }}
        >
          <NavControls />
        </Box>

        <Grid as={Router} bg="muted" rows="1fr">
          <AlbumGrid path="/albums" />

          <Artists path="/artists" />

          <LibraryHome path="/" />
        </Grid>

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
    </Grid>
  )
}

export default LibraryPage
