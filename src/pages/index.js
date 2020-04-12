import React from "react"
import {
  AspectRatio,
  Badge,
  Container,
  Grid,
  Heading,
  Text,
} from "theme-ui"

import Layout from "../components/layout"
import Image from "../components/image"
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

    fetch('https://api.discogs.com/users/tsnieman/collection/folders/0/releases')
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
          {collection.map(release => (
            <AspectRatio
              ratio={1/1}
              key={release.id}
              sx={{
                bg: 'white',
                border: '1px solid',
                borderColor: 'muted',
                overflow: 'hidden',
              }}
            >
              <Grid
                gap={2}
              >
                <Badge>
                  id: {release.id}
                </Badge>

                <Badge>
                  {release.basic_information.genres.join(' / ')}
                </Badge>
              </Grid>

              <Image />
            </AspectRatio>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export default IndexPage
