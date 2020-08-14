// import React, { useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';

import Main from '@components/layouts/Main';
import Crud from '@modules/Crud';
import withAuth from '@hocs/withAuth';

import { get } from '@modules/Crud/services';
import { CrudTableProps } from '@modules/Crud/interfaces';
import { UrlParams } from '@interfaces';

const CrudPage: NextPage<CrudTableProps> = ({ initialData }) => {
  console.log(initialData, 'DDDDDDDDDDDDASDASD');

  return (
    <Main title="New Title">
      <Crud initialData={initialData} />
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.

  try {
    const response = await get<UrlParams>(query);

    return { props: { initialData: response } };
  } catch (error) {
    return { props: { initialData: {} } };
  }
};

export default withAuth(CrudPage);
