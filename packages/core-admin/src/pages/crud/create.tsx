import { NextPage } from 'next';

import Main from '@components/layouts/Main';
import Create from '@modules/Crud/Create';
import withAuth from '@hocs/withAuth';

const CreatePage: NextPage = () => (
  <Main title="Create Title">
    <Create />
  </Main>
);

export default withAuth(CreatePage);
