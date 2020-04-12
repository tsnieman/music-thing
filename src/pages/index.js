import React from "react"
import {
  AspectRatio,
  Badge,
  Box,
  Container,
  Grid,
  Heading,
  Image as TImage,
  Text,
} from "theme-ui"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const [collection, setCollection] = React.useState([]);

  // TODO feels like bad practice to circumvent gatsby data layer, but i dont really care for the
  // time being.
  React.useEffect(() => {
    console.log('effect');

    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then(res => res.json())
      .then(json => console.log({ ditto: json }));

    fetch('https://api.discogs.com/users/tsnieman/collection/folders/0/releases?token=maSnEZtPwLRMXfgzfpjkAMeZMXvzendkTldZVKup')
      .then(res => res.json())
      .then(json => {
        console.log({ discogs: json })

        const { releases } = json;

        setCollection(releases);
      });
  }, []);

  return (
    <Layout>
      <SEO title="Home" />

      <Container
        padding={2}
        sx={{
          bg: 'secondary',
          padding: 2,
        }}
      >
        <Heading>
          Collection:
        </Heading>

        <Text>
          {collection.length === 0 && 'No items in collection'}
        </Text>

        <Grid
          columns={3}
          gap={2}
        >
          {collection.map((release, releaseIndex) => (
            <AspectRatio
              ratio={1/1}
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
                  left: 0,
                  right: 0,
                }}
              >
                <Badge>
                  id: {release.id}
                </Badge>

                <Badge>
                  {release.basic_information.genres.join(' / ')}
                </Badge>
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
      </Container>
    </Layout>
  )
}

export default IndexPage
