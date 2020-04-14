import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'
import {
  AspectRatio,
  Badge,
  Box,
  Flex,
  Grid,
  Image as TImage,
  Label,
  Slider,
  Text,
} from 'theme-ui'
import createPersistedState from 'use-persisted-state'

import Layout from '../components/layout'
import SEO from '../components/seo'

const useAlbumSizeState = createPersistedState('albumSize')

const IndexPage = () => {
  const {
    discogsReleases: { releases },
  } = useStaticQuery(
    graphql`
      query {
        discogsReleases {
          id
          releases {
            id
            basic_information {
              id
              title
              cover_image
            }
          }
        }
      }
    `
  )

  const [albumSize, setAlbumSize] = useAlbumSizeState(256)
  const albumSizeElement = React.useRef(null)
  React.useEffect(() => {
    if (albumSizeElement.current) {
      const albumSizeElementIsFocused =
        document.activeElement.id === albumSizeElement.current.id
      const shouldSyncAlbumSizeSlider =
        document.hasFocus() && albumSizeElementIsFocused
      if (!shouldSyncAlbumSizeSlider) albumSizeElement.current.value = albumSize
    }
  }, [albumSize])

  return (
    <Layout
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'red',
      }}
    >
      <SEO title="Home" />

      <Grid
        as="main"
        columns="30ch 1fr 30ch"
        sx={{
          flex: '1 1 auto',
          background: 'orange',

          '& > *': {
            // background: 'green',
            // border: '1px solid cyan',
          },
        }}
      >
        <Box>
          <Text>Sidebar</Text>
        </Box>

        <Flex
          sx={{
            flexDirection: 'column',
          }}
        >
          <Flex sx={{ flexDirection: 'row' }} p={2}>
            <Grid
              columns="min-content 1fr"
              ml="auto"
              sx={{
                alignItems: 'center',
                padding: 2,
              }}
            >
              <Label htmlFor="album-size" sx={{ whiteSpace: 'nowrap' }}>
                Album size:
              </Label>

              <Slider
                id="album-size"
                ref={albumSizeElement}
                defaultValue={albumSize}
                onChange={(e) => setAlbumSize(e.target.value)}
                min={128}
                max={512}
              />
            </Grid>
          </Flex>

          <Box
            sx={{
              padding: 2,

              // Vertical scrollbar
              flex: '1 1 auto',
              overflow: 'auto',
              height: 0,
            }}
          >
            <Text>{releases.length === 0 && 'No items in collection'}</Text>

            <Grid
              columns={`repeat(auto-fit, minmax(${albumSize}px, 1fr))`}
              gap={3}
            >
              {releases.map((release, releaseIndex) => (
                <AspectRatio
                  ratio={1 / 1}
                  key={`${release.id}-${releaseIndex}`}
                  sx={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'muted',
                  }}
                >
                  <Box
                    sx={{
                      padding: 1,
                      position: 'absolute',
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                  >
                    <Badge>id: {release.id}</Badge>
                  </Box>

                  <TImage
                    src={release.basic_information.cover_image}
                    sx={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </AspectRatio>
              ))}
            </Grid>
          </Box>
        </Flex>

        <Box bg="background">
          Playlist
          {/*
          {Array(45)
            .fill(0)
            .map((i, index) => (
              <Text key={index}>Playlist</Text>
            ))}
          */}
        </Box>
      </Grid>
    </Layout>
  )
}

export default IndexPage
