/** @jsx jsx */
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { jsx, AspectRatio, Box, IconButton } from 'theme-ui'

const NowPlaying = () => {
  const { collectionRelease: release } = useStaticQuery(
    graphql`
      query {
        collectionRelease(id: { eq: "2126d5ff-a5ad-5774-beb2-84ff9fd8f32d" }) {
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
    `
  )

  return (
    <Box sx={{ position: 'relative' }}>
      <AspectRatio
        ratio={1 / 1}
        sx={{
          bg: 'white',
        }}
      >
        <Img
          title={`Cover art for “${release.basic_information.title}”`}
          fluid={release.basic_information.cover_image.childImageSharp.fluid}
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
  )
}

export default NowPlaying
