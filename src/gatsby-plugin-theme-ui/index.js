import { darken, lighten } from '@theme-ui/color'

export default {
  // set the initial color mode to dark when @media (prefers-color-scheme: dark)
  // matches, or light when @media (prefers-color-scheme: light) matches
  // useColorSchemeMediaQuery: true,

  sizes: {
    container: 960,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#000',
    background: '#eee',
    primary: '#816786',
    secondary: '#B7D2BF',
    muted: '#f6f6f6',
    border: '#ccc',

    buttonBgPrimary: '#7A486E',
    buttonTextPrimary: 'white',

    buttonBgSecondary: '#D8E7CA',
    buttonTextSecondary: 'black',

    modes: {
      dark: {
        text: '#fff',
        background: '#191919',
        muted: '#2d2d2d',

        buttonBgSecondary: 'black',
        buttonTextSecondary: 'white',
      },
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    h1: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5,
    },
    h2: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4,
    },
    h3: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 3,
    },
    h4: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 2,
    },
    h5: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 1,
    },
    h6: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 0,
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    a: {
      color: 'primary',
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    img: {
      maxWidth: '100%',
    },
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
    },

    album: {
      padding: 2,
      border: '1px solid',
      borderColor: 'border',
      background: 'white',
    },
  },
  buttons: {
    primary: {
      color: 'buttonBgPrimary',
      bg: 'buttonBgPrimary',
      '&:hover': {
        bg: lighten('buttonBgPrimary', 0.15),
      },
    },
    secondary: {
      color: 'buttonTextSecondary',
      bg: 'buttonBgSecondary',
      '&:hover': {
        bg: darken('buttonBgSecondary', 0.15),
      },
    },
  },
}
