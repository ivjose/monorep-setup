import { NextPage } from 'next';

import Public from '@components/layouts/Public';
import withoutAuth from '@hocs/withoutAuth';
import Reset from '@modules/Reset';

const ResetPage: NextPage = () => (
  <Public>
    <Reset />
  </Public>
);

export default withoutAuth(ResetPage);
