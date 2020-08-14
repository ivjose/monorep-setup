// import React, { useEffect, useState } from 'react';

export type Order = 'asc' | 'desc';

export type TableColumnsProps<DataKey> = {
  title: string;
  name: keyof DataKey;
  sort?: boolean;
};

export type IconType = 'edit' | 'delete' | 'view';

export interface ActionIconsType {
  [key: string]: JSX.Element;
}

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

export interface ActionProps<T> {
  icon: IconType;
  tooltip: string;
  onClick?: (K: T) => void;
  href?: string;
  slug?: string;
}

export interface TableProps<TableData> {
  title?: string;
  pagination?: boolean;
  columns: TableColumnsProps<TableData>[];
  keyId: keyof TableData;
  dataSource: TableData[] | undefined;
  total?: number | string;
  actions: ActionProps<TableData>[];
  headerAction: (action: TableDataType<TableData>) => JSX.Element;
}
