import { NextPage } from 'next';
import { GetStaticProps } from 'next';

import Main from '@components/layouts/Main';
import Dashboard from '@modules/Dashboard';
import withAuth from '@hocs/withAuth';

export type User = {
  id: number;
  name: string;
};

export const sampleUserData: User[] = [
  { id: 101, name: 'Alice' },
  { id: 102, name: 'Bob' },
  { id: 103, name: 'Caroline' },
  { id: 104, name: 'Dave' },
];

type Props = {
  items: User[];
};

const IndexPage: NextPage<Props> = ({ items }) => {
  console.log(items);

  return (
    <Main title="SELLER">
      <Dashboard />
    </Main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.

  const items: User[] = sampleUserData;
  return { props: { items } };
};

export default withAuth(IndexPage);
