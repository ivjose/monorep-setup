import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import Typography from '@material-ui/core/Typography';

import { useNotifyProvider } from '@contexts/NotifyContext';

import CrudForm from '../components/CrudForm';

import { updatePost } from '../services';

import { validationSchema } from './validation';
import { useStyles } from './styles';
import { CrudProps, CrudInputs } from '../interfaces';

const Edit: React.FC<CrudProps> = ({ initialData }) => {
  const { register, handleSubmit, errors } = useForm<CrudInputs>({
    defaultValues: {
      ...initialData,
    },
    resolver: yupResolver(validationSchema),
  });
  const classes = useStyles();
  const { push, query } = useRouter();
  const { setUpdateStatus } = useNotifyProvider();

  const submitForm = async (values: CrudInputs) => {
    // alert(JSON.stringify(data));
    try {
      await updatePost<CrudInputs>(values, query?.crudId);

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
          Edit Shipping address
        </Typography>
        <CrudForm register={register} errors={errors} />
      </form>
    </React.Fragment>
  );
};

export default Edit;
