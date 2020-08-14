import { NextPage } from 'next';

import Public from '@components/layouts/Public';
import withoutAuth from '@hocs/withoutAuth';
import Register from '@modules/Register';

const RegisterPage: NextPage = () => (
  <Public>
    <Register />
  </Public>
);

export default withoutAuth(RegisterPage);
