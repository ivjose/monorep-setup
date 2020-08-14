import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    maxWidth: 450,
    // marginTop: theme.spacing(1),
    margin: '0 auto',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
