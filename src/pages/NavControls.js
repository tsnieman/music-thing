/** @jsx jsx */
import * as React from 'react'
import { jsx, Box, Flex, NavLink } from 'theme-ui'

import Layout from '../components/layout'
import SEO from '../components/seo'

import AlbumGrid from './AlbumGrid'
import NowPlaying from './NowPlaying'
import Playlist from './Playlist'

const NavControls = () => (
  <Flex
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
)

export default NavControls
