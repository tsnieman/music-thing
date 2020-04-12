import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout>
    <SEO title="About" />

    <h1>Hi from the second page</h1>

    garbage
    <p>Welcome to page 2</p>

    <Link to="/">Homepage</Link>
  </Layout>
)

export default SecondPage
