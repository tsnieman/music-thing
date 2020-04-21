/** @jsx jsx */
import { useStaticQuery, graphql } from 'gatsby'
import { jsx, Box, Flex, Grid } from 'theme-ui'

import Layout from '../components/layout'
import SEO from '../components/seo'

import NavControls from './NavControls'
import AlbumGrid from './AlbumGrid'
import NowPlaying from './NowPlaying'
import Playlist from './Playlist'

const IndexPage = () => {
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
          sx={{
            '& > *': {
              width: '100%',
            },
          }}
        >
          <NavControls />
        </Flex>

        <Flex
          bg="muted"
          sx={{
            flexDirection: 'column',
          }}
        >
          <AlbumGrid />
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
    </Layout>
  )
}

export default IndexPage
