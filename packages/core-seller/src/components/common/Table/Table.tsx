import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PageviewIcon from '@material-ui/icons/Pageview';

import NextLink from '@components/common/Link';

import TablePaginationActions from './components/TablePaginationActions';
import TableToolbar from './components/TableToolbar';
import { useTableStyles } from './styles';
import { Order, TableProps, ActionIconsType } from './interfaces';
import { TABLE } from './constants';

const actionIcons: ActionIconsType = {
  edit: <EditIcon fontSize="small" />,
  delete: <DeleteIcon fontSize="small" />,
  view: <PageviewIcon fontSize="small" />,
};

const Table = <DataType extends unknown>({
  columns,
  keyId,
  dataSource = [],
  total,
  actions,
  pagination,
  title = 'Table List',
  headerAction,
}: TableProps<DataType>): JSX.Element => {
  const classes = useTableStyles();
  const { query, push, pathname } = useRouter();

  const [orderBy, setorderBy] = useState('');
  const [order, setOrder] = React.useState<Order>('asc');
  const [selected, setSelected] = React.useState<
    (string | DataType[keyof DataType])[]
  >([]);

  useEffect(() => {
    if (pagination && Number(query[TABLE.PAGE]) === 0) {
      push({ pathname, query: { ...query, [TABLE.PAGE]: 1 } });
    }
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    event?.preventDefault();
    push({ pathname, query: { ...query, [TABLE.PAGE]: newPage + 1 } });
  };
  NaN;

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    push({
      pathname,
      query: {
        ...query,
        [TABLE.PAGE]: 1,
        [TABLE.PAGE_COUNT]: parseInt(event.target.value, 10),
      },
    });
  };

  const createSortHandler = (property: string) => (
    event: React.MouseEvent<unknown>
  ) => {
    event.preventDefault();
    const isAsc = orderBy === property && order === 'asc';
    setorderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');

    push({
      pathname,
      query: { ...query, sort_by: property, order_by: isAsc ? 'desc' : 'asc' },
    });
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    name: string | DataType[keyof DataType]
  ) => {
    event.preventDefault();
    const selectedIndex = selected.indexOf(name);
    let newSelected: (string | DataType[keyof DataType])[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = dataSource?.map((row) => row[keyId]);
      setSelected((prevState) => {
        const mergeSelected = [...prevState, ...newSelecteds];
        const uniqueArray = mergeSelected.filter(
          (item, index) => mergeSelected.indexOf(item) === index
        );
        return uniqueArray;
        event.preventDefault();
      });
    } else {
      setSelected((prevState) =>
        prevState.filter(
          (id) => !dataSource?.some((item) => item[keyId] === id)
        )
      );
    }
  };

  const selectedPage: number =
    Number(query[TABLE.PAGE]) >= 1 ? Number(query[TABLE.PAGE]) - 1 : 0;

  const isSelected = (name: string | DataType[keyof DataType]) =>
    selected.indexOf(name) !== -1;

  const isAllSelected = dataSource?.every((item) =>
    selected.some((select) => select === item[keyId])
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar
          title={title}
          numSelected={selected.length}
          render={headerAction({
            selectedData: selected,
            callBack: () => setSelected([]),
          })}
        />
        <TableContainer component={Paper} className={classes.container}>
          <MuiTable
            stickyHeader={false}
            className={classes.table}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < dataSource.length
                    }
                    checked={dataSource.length > 0 && isAllSelected}
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                  />
                </TableCell>
                {columns?.map((column) => (
                  <TableCell
                    key={String(column.name)}
                    sortDirection={orderBy === column.name ? order : false}
                  >
                    {column.sort ? (
                      <TableSortLabel
                        active={orderBy === column.name}
                        direction={orderBy === column.name ? order : 'asc'}
                        onClick={createSortHandler(String(column.name))}
                      >
                        {column.title}
                        {orderBy === column.name ? (
                          <span className={classes.visuallyHidden}>
                            {order === 'desc'
                              ? 'sorted descending'
                              : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    ) : (
                      column.title
                    )}
                  </TableCell>
                ))}
                {!!actions?.length && (
                  <TableCell align="center">Action</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataSource?.map((row, index: number) => {
                const isItemSelected = isSelected(row[keyId]);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    key={String(row[keyId])}
                    hover
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                        onClick={(event: React.MouseEvent<unknown>) =>
                          handleClick(event, row[keyId])
                        }
                      />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell key={String(column.name)}>
                        {row[column.name]}
                      </TableCell>
                    ))}
                    {!!actions?.length && (
                      <TableCell
                        align="center"
                        padding="none"
                        style={{ width: 150 }}
                      >
                        {actions.map((action) => (
                          <Tooltip title={action.tooltip} key={action.icon}>
                            {action.href ? (
                              <NextLink
                                href={`${action.href}/[${action.slug}]`}
                                as={`${action.href}/${row[keyId]}`}
                              >
                                <IconButton aria-label="last page ASDSD">
                                  {actionIcons[action.icon]}
                                </IconButton>
                              </NextLink>
                            ) : (
                              <IconButton
                                onClick={() =>
                                  action.onClick && action.onClick(row)
                                }
                                aria-label="Delete"
                              >
                                {actionIcons[action.icon]}
                              </IconButton>
                            )}
                          </Tooltip>
                        ))}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
            {pagination && dataSource?.length > 0 && (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={Number(total)}
                    rowsPerPage={
                      query[TABLE.PAGE_COUNT]
                        ? Number(query[TABLE.PAGE_COUNT])
                        : 10
                    }
                    page={query[TABLE.PAGE] ? Number(selectedPage) : 0}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            )}
          </MuiTable>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Table;
