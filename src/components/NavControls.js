/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import { Link } from '@reach/router'

const isActive = ({
  isCurrent,
  isPartiallyCurrent,
  href,
  location,
  ...others
}) => {
  // This route should only be active when an exact match, but it's an
  // index/top-level/dashboard sort of situation. Here's a kludgey workaround:
  if (href === '/app' || href === '/app/') {
    if (location.pathname === '/app' || location.pathname === '/app/') {
      return { 'data-active': true }
    } else {
      return { 'data-active': false }
    }
  }

  return { 'data-active': isPartiallyCurrent }
}

const LINKS = [
  ['Home', './'],
  ['Artists', './artists'],
  ['Albums', './albums'],
]

const NavControls = (props) => (
  <Box {...props}>
    {LINKS.map(([label, to]) => (
      <Link
        to={to}
        getProps={isActive}
        key={to}
        sx={{
          display: 'block',
          padding: 2,
          transition: '0.1s all linear',
          borderLeft: '0.5em solid transparent',
          color: 'primary',
          textDecoration: 'none',

          '&:hover': {
            borderLeftColor: 'primary',
          },

          '&[data-active="true"]': {
            backgroundColor: 'primary',
            color: 'buttonTextPrimary',
          },
        }}
      >
        {label}
      </Link>
    ))}
  </Box>
)

export default NavControls
