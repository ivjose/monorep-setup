import { NextPage } from 'next';
import Public from '@components/layouts/Public';
import Login from '@modules/Login';
import withoutAuth from '@hocs/withoutAuth';

const LoginPage: NextPage = () => (
  <Public>
    <Login />
  </Public>
);

export default withoutAuth(LoginPage);
