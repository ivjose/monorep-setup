import { AxiosPromise } from 'axios';
import request from '@utils/request';

// import { CRUD } from './constants';

export function get<T>(params: T): AxiosPromise {
  return request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'GET',
    params,
  });
}

export function getById<T>(id: T): AxiosPromise {
  return request({
    url: `https://jsonplaceholder.typicode.com/posts/${id}`,
    method: 'GET',
  });
}

export function createUser<T>(value: T): AxiosPromise {
  return request({
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'POST',
    data: {
      ...value,
    },
  });
}

export function updatePost<T>(
  value: T,
  id: string | string[] | undefined
): AxiosPromise {
  return request({
    url: `https://jsonplaceholder.typicode.com/posts/${id}`,
    method: 'PUT',
    data: {
      ...value,
    },
  });
}

export function deletePost(id: string | string[] | undefined): AxiosPromise {
  return request({
    url: `https://jsonplaceholder.typicode.com/posts/${id}`,
    method: 'DELETE',
  });
}
