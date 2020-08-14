import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});
