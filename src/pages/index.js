import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'
import {
  AspectRatio,
  Badge,
  Box,
  Grid,
  Heading,
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
    const albumSizeElementIsFocused =
      document.activeElement.id === albumSizeElement.current.id
    const shouldSyncAlbumSizeSlider =
      document.hasFocus() && albumSizeElementIsFocused
    if (!shouldSyncAlbumSizeSlider) albumSizeElement.current.value = albumSize
  }, [albumSize])

  return (
    <Layout>
      <SEO title="Home" />

      <Box padding={2}>
        <Grid columns="1fr minmax(min-content, 30ch)">
          <Heading>Collection:</Heading>

          <Grid columns="min-content 1fr">
            <Label htmlFor="album-size" sx={{ whiteSpace: 'nowrap' }}>
              Album size:
            </Label>

            <Slider
              id="album-size"
              ref={albumSizeElement}
              defaultValue={albumSize}
              onChange={(e) => setAlbumSize(e.target.value)}
              min={256}
              max={512}
            />
          </Grid>
        </Grid>

        <Text>{releases.length === 0 && 'No items in collection'}</Text>

        <Grid columns={`repeat(auto-fit, minmax(${albumSize}px, 1fr))`} gap={2}>
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
    </Layout>
  )
}

export default IndexPage
