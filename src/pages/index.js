import React from "react"
import {
  Heading,
  Text,
  Container,
  AspectRatio,
  Grid,
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
          padding: 2,
        }}
      >
        <Heading>
          Collection:
        </Heading>

        <Grid
          columns={3}
          gap={2}
        >
          {collection.length === 0 && 'No items in collection'}

          {collection.map(release => (
            <AspectRatio
              ratio={1/1}
              key={release.id}
              bg="white"
            >
              <Text>
                id: {release.id}
              </Text>

              <Text>
                {release.basic_information.genres.join(' / ')}
              </Text>

              <Image />
            </AspectRatio>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export default IndexPage
