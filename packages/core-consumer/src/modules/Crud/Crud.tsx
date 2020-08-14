import React from 'react';
import { useRouter } from 'next/router';
import SaveIcon from '@material-ui/icons/Save';

import useRequest from '@hooks/useRequest';
import Button from '@components/common/Button';
import Table from '@components/common/Table';
import { TableDataType } from '@components/common/Table/interfaces';
import { useNotifyProvider } from '@contexts/NotifyContext';

import { User, CrudTableProps } from './interfaces';
import { deletePost } from './services';
// import { CRUD } from './constants';

const Crud: React.FC<CrudTableProps> = ({ initialData }) => {
  const { query } = useRouter();
  const { setUpdateStatus } = useNotifyProvider();
  const { data, mutate } = useRequest<User[]>(
    {
      // url: CRUD.API,
      url: 'https://jsonplaceholder.typicode.com/posts',
      params: {
        ...query,
      },
    },
    {
      initialData,
    }
  );

  console.log(initialData, data);

  const handleSelectedList = ({
    selectedData,
    callBack,
  }: TableDataType<User>) => {
    console.log(selectedData);
    callBack();
  };

  console.log(data, 'ADSASDASDasd');

  const handleDelete = async (id: string | string[] | undefined) => {
    try {
      await deletePost(id);
      mutate();
      setUpdateStatus({ message: 'Successfuly DEleted', status: 'success' });
    } catch (error) {
      setUpdateStatus({ message: 'Failed DEleted', status: 'error' });
    }
  };

  return (
    <div>
      <Table<User>
        pagination
        title="User List"
        keyId="id"
        total={100}
        dataSource={data}
        headerAction={({ selectedData, callBack }) => (
          <div>
            <Button
              color="primary"
              href="/crud/create"
              size="small"
              startIcon={<SaveIcon />}
              onClick={() => handleSelectedList({ selectedData, callBack })}
            >
              Add
            </Button>
          </div>
        )}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit User',
            href: '/crud',
            slug: 'crudId',
          },
          {
            icon: 'delete',
            tooltip: 'delete User',
            onClick: (rowData) => handleDelete(`${rowData.id}`),
          },
        ]}
        columns={[
          {
            title: 'Title',
            name: 'title',
          },
          {
            title: 'Body',
            name: 'body',
            sort: true,
          },
        ]}
      />
    </div>
  );
};

export default React.memo(Crud);
