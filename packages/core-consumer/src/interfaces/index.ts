// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

export type UrlParams = {
  page?: number | string;
  per_page?: number | string;
  total?: number | string;
  total_pages?: number | string;
};

export type SlugType = string | string[] | undefined;
