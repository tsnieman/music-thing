import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  IconButton,
  Image as TImage,
  Label,
  NavLink,
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

  const [albumSnap, setAlbumSnap] = React.useState('mandatory')

  return (
    <Layout
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SEO title="Home" />

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
        <Flex
          as="nav"
          gap={0}
          sx={{
            flexDirection: 'column',
            borderRight: '1px solid',
            borderColor: 'border',

            '& > *': {
              borderLeft: '1px solid transparent',
              borderLeftWidth: '5px',
              padding: 2,
              transition: '0.1s all linear',
              cursor: 'pointer',

              '&:hover': {
                borderColor: 'primary',
              },

              '&[data-active]': {
                backgroundColor: 'primary',
                color: 'buttonTextPrimary',
              },
            },
          }}
        >
          <NavLink>Home</NavLink>
          <NavLink>Artists</NavLink>
          <NavLink data-active>Albums</NavLink>
        </Flex>

        <Flex
          bg="muted"
          sx={{
            flexDirection: 'column',
          }}
        >
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
                      loading="lazy"
                      src={release.basic_information.cover_image}
                      sx={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </AspectRatio>
                </Card>
              ))}
            </Grid>
          </Box>
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
            }}
          >
            <AspectRatio
              ratio={1 / 1}
              sx={{
                bg: 'white',
                border: '1px solid',
                borderColor: 'muted',
              }}
            >
              <TImage
                src={releases[48].basic_information.cover_image}
                sx={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            </AspectRatio>

            <IconButton
              aria-label="Play / Pause"
              sx={{
                position: 'absolute',
                bottom: 2,
                left: 2,
                // top: '50%',
                // left: '50%',
                // transform: 'translateX(-50%) translateY(-50%)',
                padding: 1,
                backgroundColor: 'white',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentcolor"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </IconButton>
          </Box>

          <Box
            pb={4}
            sx={{
              // Specificity hack
              '& > * + *[class]': {
                borderTop: 0,
              },
            }}
          >
            {Array(45)
              .fill(0)
              .map((i, index) => (
                <Box
                  key={index}
                  p={2}
                  sx={{
                    border: '1px solid',
                    borderColor: 'border',

                    '&:hover': {
                      // TODO why doesn't `muted` work here?
                      background: (theme) => theme.colors.muted,
                    },
                  }}
                >
                  <Text sx={{ fontWeight: 'bold' }}>Song</Text>
                  <Text sx={{ fontSize: 1 }}>Artist name</Text>
                </Box>
              ))}
          </Box>
        </Box>
      </Grid>
    </Layout>
  )
}

export default IndexPage
