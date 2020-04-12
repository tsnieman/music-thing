import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'
import {
  AspectRatio,
  Badge,
  Box,
  Grid,
  Heading,
  Image as TImage,
  Text,
} from 'theme-ui'

import Layout from '../components/layout'
import SEO from '../components/seo'

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

  return (
    <Layout>
      <SEO title="Home" />

      <Box padding={2}>
        <Heading>Collection:</Heading>

        <Text>{releases.length === 0 && 'No items in collection'}</Text>

        <Grid columns={`repeat(auto-fit, minmax(256px, 1fr))`} gap={2}>
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
