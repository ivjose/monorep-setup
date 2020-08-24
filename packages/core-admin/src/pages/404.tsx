import { NextPage } from 'next';
import Public from '@components/layouts/Public';
import Page404 from '@modules/Page404';

const Custom404: NextPage = () => (
  <Public>
    <Page404 />
  </Public>
);

export default Custom404;
