/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import { Link } from '@reach/router'

const isActive = ({ isCurrent }) => ({ 'data-active': isCurrent })

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
