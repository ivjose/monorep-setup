import { NextPage } from 'next';
import Main from '@components/layouts/Main';
import withAuth from '@hocs/withAuth';

const profile: NextPage = () => {
  return (
    <Main title="Profile">
      <div>Profile</div>
    </Main>
  );
};

export default withAuth(profile);
