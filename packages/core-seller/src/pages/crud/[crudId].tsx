import { NextPage } from 'next';
import { GetServerSideProps } from 'next';

import Main from '@components/layouts/Main';
import withAuth from '@hocs/withAuth';

import Edit from '@modules/Crud/Edit';
import { getById } from '@modules/Crud/services';
import { CrudProps } from '@modules/Crud/interfaces';

const CrudReadPage: NextPage<CrudProps> = ({ initialData }) => {
  return (
    <Main title="Edit Page">
      <Edit initialData={initialData} />
    </Main>
  );
};

type SlugType = string | string[] | undefined;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const { crudId } = context.query;
  console.log(crudId);

  try {
    const response = await getById<SlugType>(crudId);

    return { props: { initialData: response } };
  } catch (error) {
    return { props: { initialData: {} } };
  }
};

export default withAuth(CrudReadPage);
