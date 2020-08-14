import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import Typography from '@material-ui/core/Typography';

import { useNotifyProvider } from '@contexts/NotifyContext';

import CrudForm from '../components/CrudForm';

import { createUser } from '../services';
import { CrudInputs } from '../interfaces';

import { validationSchema } from './validation';
import { useStyles } from './styles';

const Create: React.FC = () => {
  const { register, handleSubmit, errors, reset } = useForm<CrudInputs>({
    resolver: yupResolver(validationSchema),
  });
  const classes = useStyles();
  const { push } = useRouter();
  const { setUpdateStatus } = useNotifyProvider();

  const submitForm = async (values: CrudInputs) => {
    try {
      await createUser<CrudInputs>(values);

      reset();
      push('/crud?_page=1&_limit=10');
      setUpdateStatus({ message: 'Successfuly created!', status: 'success' });
    } catch (error) {
      setUpdateStatus({
        message: 'Oops Something went wrong',
        status: 'error',
      });
    }
  };

  return (
    <React.Fragment>
      <form
        noValidate
        className={classes.form}
        onSubmit={handleSubmit(submitForm)}
      >
        <Typography variant="h6" gutterBottom>
          Shipping sssaddress
        </Typography>
        <CrudForm register={register} errors={errors} />
      </form>
    </React.Fragment>
  );
};

export default Create;
