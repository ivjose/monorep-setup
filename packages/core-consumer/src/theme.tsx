import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    background: {
      default: '#fff',
    },
  },

  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
        },
        '#__next': {
          height: '100%',
        },
      },
    },
  },
  props: {
    // Name of the component ⚛️
    MuiButton: {
      // The default props to change
      disableRipple: true, // No more ripple, on the whole application 💣!
      color: 'primary',
      variant: 'contained',
    },
  },
});
