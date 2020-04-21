/** @jsx jsx */
import { jsx, Flex, NavLink } from 'theme-ui'

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
