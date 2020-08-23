import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { InputTextFloat } from '@project/shared-components';

import Link from '@components/common/Link';
import { useAuth } from '@contexts/AuthContext';

import { useStyles } from './styles';
import { validationSchema } from './validation';

type Inputs = {
  email: string;
};

const Reset: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });
  const classes = useStyles();
  const { setAuthenticated } = useAuth();

  const submitForm = (data: Inputs) => {
    alert(JSON.stringify(data));
    setAuthenticated(true);
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Reset Password
      </Typography>
      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(submitForm)}
      >
        <InputTextFloat
          inputRef={register}
          required
          id="email"
          label="Email Address"
          name="email"
          helperText={errors.email?.message}
          error={!!errors.email?.message}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Reset Password
        </Button>

        <Grid container>
          <Grid item xs>
            <Link href="/login" variant="body2">
              Login
            </Link>
          </Grid>
          <Grid item>
            <span>
              {`Remembered your password? `}
              <Link href="/register" variant="body2">
                {'Sign Up'}
              </Link>
            </span>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Reset;
