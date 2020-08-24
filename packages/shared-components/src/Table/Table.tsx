import React, { useEffect, useState } from 'react';

import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import TableFooter from '@material-ui/core/TableFooter';
// import TablePagination from '@material-ui/core/TablePagination';
import Pagination from '@material-ui/lab/Pagination';

import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

// import TablePaginationActions from './components/TablePaginationActions';
import TableToolbar from './components/TableToolbar';
import { useTableStyles } from './styles';
import { Order, TableProps } from './interfaces';
import { TABLE } from './constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = <DataType extends { [key: string]: any }>({
  search,
  columns,
  keyId,
  dataSource = [],
  total,
  pagination,
  checkbox,
  title = 'Table List',
  headerAction,
  router = {
    query: {},
    push: () => {},
    pathname: '',
  },
}: TableProps<DataType>): JSX.Element => {
  const classes = useTableStyles();
  const { query, push, pathname } = router;

  const [orderBy, setorderBy] = useState('');
  const [order, setOrder] = useState<Order>('asc');
  const [selected, setSelected] = useState<
    (string | DataType[keyof DataType])[]
  >([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (pagination && Number(query[TABLE.PAGE]) === 0) {
      push({ pathname, query: { ...query, [TABLE.PAGE]: 1 } });
    }
  }, []);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event?.preventDefault();
    console.log(value, 'asdasd');

    push({ pathname, query: { ...query, [TABLE.PAGE]: value } });
  };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   push({
  //     pathname,
  //     query: {
  //       ...query,
  //       [TABLE.PAGE]: 1,
  //       [TABLE.PAGE_COUNT]: parseInt(event.target.value, 10),
  //     },
  //   });
  // };

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

  const handleSearchText = (value: string) => {
    console.log(value, 'SEARCGH!!!');
    setSearchText(value);
    if (value) {
      push({
        pathname,
        query: { ...query, search: value },
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { search, ...newQuery } = query;
      push({
        pathname,
        query: { ...newQuery },
      });
    }
  };

  // const selectedPage: number =
  //   Number(query[TABLE.PAGE]) >= 1 ? Number(query[TABLE.PAGE]) - 1 : 0;

  const isSelected = (name: string | DataType[keyof DataType]) =>
    selected.indexOf(name) !== -1;

  const isAllSelected = dataSource?.every((item) =>
    selected.some((select) => select === item[keyId])
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar
          search={search}
          title={title}
          numSelected={selected.length}
          searchText={searchText}
          setSearchText={handleSearchText}
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
            {pagination && dataSource?.length > 0 && (
              <caption style={{ textAlign: 'center' }}>
                <Pagination
                  size="small"
                  page={Number(query[TABLE.PAGE])}
                  count={Number(total)}
                  onChange={handleChangePage}
                  style={{ display: 'inline-block' }}
                />
              </caption>
            )}

            <TableHead>
              <TableRow>
                {checkbox && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < dataSource.length
                      }
                      checked={dataSource.length > 0 && isAllSelected}
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                  </TableCell>
                )}

                {columns?.map((column) => (
                  <TableCell
                    key={String(column.name)}
                    sortDirection={orderBy === column.name ? order : false}
                    align={column.align}
                    style={{ width: column.width }}
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
                      {checkbox && (
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={(event: React.MouseEvent<unknown>) =>
                            handleClick(event, row[keyId])
                          }
                        />
                      )}
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell key={String(column.name)} align={column.align}>
                        {column.render ? column.render(row) : row[column.name]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Table;
