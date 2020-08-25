import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

import { InputTextFloat } from '@project/shared-components';

import Link from '@components/common/Link';
import { useAuth } from '@contexts/AuthContext';

import { useStyles } from './styles';
import { validationSchema } from './validation';

type Inputs = {
  email: string;
  password: string;
};

const Register: React.FC = () => {
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
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>

      <Alert severity="error">This is an error message!</Alert>
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
          error={!!errors.email?.message}
          errorText={errors.email?.message}
        />

        <InputTextFloat
          inputRef={register}
          required
          name="password"
          label="Password"
          type="password"
          id="password"
          helperText={errors.password?.message}
          error={!!errors.password?.message}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container justify="center">
          <span>
            Have an account?{' '}
            <Link href="/login" variant="body2">
              {`Login`}
            </Link>
          </span>
        </Grid>
      </form>
    </div>
  );
};

export default Register;
