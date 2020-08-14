import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

export const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1, 0, 2),
  },
}));

export const DefaultInputText = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '100%',
      padding: '3px 10px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
    },
    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
  error: {
    'label + &': {
      border: `1px solid ${theme.palette.error.main}`,
    },
  },
  input: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
}))(InputBase);
