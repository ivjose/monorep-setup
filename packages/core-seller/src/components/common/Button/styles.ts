import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useTableStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    link: {
      textDecoration: 'none',
    },
  })
);
