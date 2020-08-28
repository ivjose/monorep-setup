// import { UrlParams } from '../../interfaces';

export type User = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type CrudInputs = {
  title: string;
  body: string;
};

// export interface CrudTableProps extends UrlParams {
//   data?: User[];
// }

export interface CrudTableProps {
  // data?: User[];
  initialData: User[];
}

export interface CrudProps {
  initialData: User;
}
