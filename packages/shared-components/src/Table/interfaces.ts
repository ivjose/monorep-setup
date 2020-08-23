export type Order = 'asc' | 'desc';

export type TableColumnsProps<DataKey> = {
  title: string;
  name: keyof DataKey | string;
  sort?: boolean;
  render?: (data: DataKey) => JSX.Element;
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right' | undefined;
  width?: number;
};

export interface TableDataType<T> {
  selectedData: (string | T[keyof T])[];
  callBack: () => void;
}

export interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

export interface TableProps<TableData> {
  title?: string;
  search?: boolean;
  pagination?: boolean;
  checkbox?: boolean;
  columns: TableColumnsProps<TableData>[];
  keyId: keyof TableData;
  dataSource: TableData[] | undefined;
  total?: number | string;
  headerAction: (action: TableDataType<TableData>) => JSX.Element;
  router?: any;
}
