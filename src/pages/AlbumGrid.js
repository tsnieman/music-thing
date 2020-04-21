/** @jsx jsx */
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import * as React from 'react'
import {
  jsx,
  AspectRatio,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Label,
  Slider,
  Text,
} from 'theme-ui'
import createPersistedState from 'use-persisted-state'

const useAlbumSizeState = createPersistedState('albumSize')

const AlbumGrid = () => {
  const {
    allCollectionRelease: { edges },
  } = useStaticQuery(
    graphql`
      query {
        allCollectionRelease {
          edges {
            node {
              id
              basic_information {
                id
                title
                cover_image {
                  childImageSharp {
                    fluid(cropFocus: CENTER, maxWidth: 1000, maxHeight: 1000) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  const releases = edges.map(({ node: release }) => release)

  const [albumSnap, setAlbumSnap] = React.useState('mandatory')

  const [albumSize, setAlbumSize] = useAlbumSizeState(4)
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
    <>
      <Flex sx={{ flexDirection: 'row' }} p={2}>
        <Flex sx={{ flexDirection: 'row' }} p={2} ml="auto">
          <Button
            variant="primary"
            sx={{
              cursor: 'pointer',
              width: 'min-content',
              whiteSpace: 'nowrap',
            }}
            onClick={(e) => {
              setAlbumSnap(albumSnap === 'none' ? 'mandatory' : 'none')
            }}
            mr={1}
          >
            Snap: {albumSnap}
          </Button>

          <Grid
            columns="min-content 1fr"
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
              min={2}
              max={12}
              sx={{ transform: 'scaleX(-1)' }}
            />
          </Grid>
        </Flex>
      </Flex>

      <Box
        sx={{
          padding: 2,

          // Vertical scrollbar
          flex: '1 1 auto',
          overflow: 'auto',
          height: 0,

          scrollSnapType: `y ${albumSnap}`,
        }}
      >
        <Text>{releases.length === 0 && 'No items in collection'}</Text>

        <Grid columns={`repeat(${albumSize}, 1fr)`} gap={2} pb={4}>
          {releases.map((release, releaseIndex) => (
            <Card
              key={`${release.id}-${releaseIndex}`}
              variant="album"
              sx={{
                scrollSnapAlign: 'start',
                scrollMarginTop: (i) => i.space[2],
              }}
            >
              <AspectRatio
                ratio={1 / 1}
                key={`${release.id}-${releaseIndex}`}
                sx={{
                  bg: 'white',
                  border: '1px solid',
                  borderColor: 'muted',
                }}
              >
                <Img
                  title={`Cover art for “${release.basic_information.title}”`}
                  loading="lazy"
                  fluid={
                    release.basic_information.cover_image.childImageSharp.fluid
                  }
                  sx={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                />

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
              </AspectRatio>
            </Card>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default AlbumGrid
