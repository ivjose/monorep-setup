// import React, { useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';

import Main from '@components/layouts/Main';
import CrudRedux from '@modules/CrudRedux';
import withAuth from '@hocs/withAuth';

import { CrudTableProps } from '@modules/Crud/interfaces';

const CrudRreduxPage: NextPage<CrudTableProps> = () => {
  return (
    <Main title="New Title">
      <CrudRedux />
    </Main>
  );
};

export default withAuth(CrudRreduxPage);
