import React from 'react';
import { useRouter } from 'next/router';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import { Button } from '@project/shared-components';
import { Table, TableDataType } from '@project/shared-components';

import useRequest from '@hooks/useRequest';
import NextLink from '@components/common/Link';
import { useNotifyProvider } from '@contexts/NotifyContext';

import { User, CrudTableProps } from './interfaces';
import { deletePost } from './services';
// import { CRUD } from './constants';

const Crud: React.FC = () => {
  const router = useRouter();
  const { setUpdateStatus } = useNotifyProvider();
  const { data, mutate } = useRequest<User[]>({
    // url: CRUD.API,
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: {
      ...router.query,
    },
  });

  const handleSelectedList = ({
    selectedData,
    callBack,
  }: TableDataType<User>) => {
    console.log(selectedData);
    callBack();
  };

  console.log(data, 'LOAD THIS REDUX');

  const handleDelete = async (id: number) => {
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
        checkbox
        search
        title="Redux Users List"
        keyId="id"
        total={100}
        router={router}
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
          {
            title: 'Action',
            name: 'action',
            width: 150,
            align: 'center',
            // eslint-disable-next-line react/display-name
            render: (data) => (
              <div>
                <Tooltip title="asdasd">
                  <NextLink href={`/crud/[crudId]`} as={`/crud/${data.id}`}>
                    <IconButton aria-label="last page ASDSD">
                      <EditIcon />
                    </IconButton>
                  </NextLink>
                </Tooltip>
                <Tooltip title="asdasd">
                  <IconButton
                    aria-label="last page ASDSD"
                    onClick={() => handleDelete(data.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default React.memo(Crud);
