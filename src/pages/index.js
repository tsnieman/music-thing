import React from "react"
import { Link } from "gatsby"
import {
  Box,
  Card,
  Heading,
  Text
} from "rebass"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Box
      width={256}
      bg="foo"
    >
      <Image />

      <Heading as='h3'>
        Testing
      </Heading>

      <Text fontSize={0}>
        Testing
      </Text>
    </Box>

    <Link to="/about/">About</Link>
  </Layout>
)

export default IndexPage
