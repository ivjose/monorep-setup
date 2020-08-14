import React, { ReactNode } from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Copyright from './components/Copyright';
import { useStyles } from './styles';

type Props = {
  children?: ReactNode;
};

const Public: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.wrap}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Container className={classes.content} component="main" maxWidth="xs">
        <>{children}</>
      </Container>
      <Box className={classes.footer} component="footer" p={2}>
        <Copyright />
      </Box>
    </Grid>
  );
};

export default Public;
