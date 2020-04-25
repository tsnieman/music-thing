/** @jsx jsx */
import { jsx, Box, Flex } from 'theme-ui'
import { Link } from '@reach/router'

const isActive = ({ isCurrent }) => ({ 'data-active': isCurrent })

const LINKS = [
  ['Home', './'],
  ['Artists', './artists'],
  ['Albums', './albums'],
]

const NavControls = () => (
  <Flex
    sx={{
      flexDirection: 'column',
      borderRight: '1px solid',
      borderColor: 'border',

      '& > *': {
        transition: '0.1s all linear',
        borderLeft: '0.5em solid transparent',
        color: 'primary',
        textDecoration: 'none',

        '&:hover': {
          borderLeftColor: 'primary',
        },

        '&[data-active]': {
          backgroundColor: 'primary',
          color: 'buttonTextPrimary',
        },
      },
    }}
  >
    {LINKS.map(([label, to]) => (
      <Link to={to} getProps={isActive} key={to}>
        <Box p={2}>{label}</Box>
      </Link>
    ))}
  </Flex>
)

export default NavControls
