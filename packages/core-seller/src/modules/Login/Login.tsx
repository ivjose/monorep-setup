import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GetStaticProps } from 'next';
import { yupResolver } from '@hookform/resolvers';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import { InputTextFloat, Alert } from '@project/shared-components';

import Link from '@components/common/Link';
import { useAuth } from '@contexts/AuthContext';

import { useStyles } from './styles';
import { validationSchema } from './validation';

type Inputs = {
  email: string;
  password: string;
};

type DisplayStaus = {
  title: string;
  status: 'success' | 'info' | 'warning' | 'error' | undefined;
  message: string;
};

const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });
  const classes = useStyles();
  const { setAuthenticated } = useAuth();
  const [showpassword, setShowpassword] = useState<boolean>(false);
  const [displayStatus, setDisplayStatus] = useState<DisplayStaus | undefined>(
    undefined
  );

  const submitForm = (data: Inputs) => {
    alert(JSON.stringify(data));
    setAuthenticated(true);

    // setDisplayStatus({
    //   title: 'Error',
    //   status: 'error',
    //   message: 'Mali ka hahah',
    // });
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in Test Hello
      </Typography>

      {displayStatus?.status && (
        <Alert
          title={displayStatus.title}
          severity={displayStatus.status || undefined}
          action={() =>
            setDisplayStatus({
              title: '',
              status: undefined,
              message: '',
            })
          }
        >
          {displayStatus.message}
        </Alert>
      )}
      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(submitForm)}
      >
        <InputTextFloat
          ref={register}
          label="Email Address"
          name="email"
          type="email"
          error={!!errors.email?.message}
          errorText={errors.email?.message}
        />

        <InputTextFloat
          ref={register}
          label="Password"
          name="password"
          error={!!errors.password?.message}
          errorText={errors.password?.message}
          type={showpassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowpassword((prevState) => !prevState)}
                edge="end"
              >
                {showpassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />

        <FormControlLabel
          control={
            <Checkbox
              name="remember"
              inputRef={register}
              value="remember"
              color="primary"
            />
          }
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="/reset" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <span>
              {`Don't have an account? `}
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

export const getStaticProps: GetStaticProps = async (context) => {
  // ...
  console.log('ASDASDSLOGIN!!!!!', context);

  return {
    props: { status: true },
  };
};

export default Login;
