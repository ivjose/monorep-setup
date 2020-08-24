import React from 'react';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './styles';

const Page404: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <h1>Page - 404</h1>
      <Typography component="h1" variant="h5">
        Sorry This Page is Not available
      </Typography>
    </div>
  );
};

export default Page404;
