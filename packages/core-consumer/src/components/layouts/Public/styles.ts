import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  wrap: {
    height: '100%',
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  footer: {},
}));
