import {
  createAsyncThunk,
  createSlice,
  unwrapResult,
  PayloadAction,
} from '@reduxjs/toolkit';

import { UrlParams } from '@interfaces';

import { RootState } from '../../store/rootReducers';

import { AppDispatch } from '../../store';
import { get } from './services';
import { User } from './interfaces';

interface UserState {
  users: User[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error?: string | null;
  meta: UrlParams;
}

const initialState: UserState = {
  users: [],
  meta: {
    page: 1,
    per_page: 0,
    total: undefined,
  },
  loading: 'idle',
  error: null,
};

const fetchUserById = createAsyncThunk<
  // Return type of the payload creator
  User,
  // First argument to the payload creator
  UrlParams,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: {
      jwt: string;
    };
  }
>('users/fetchByIdStatus', async (params, { getState }) => {
  const { meta } = getState().users;
  const response = await get(params);
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.pending, (state, action) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });
    builder.addCase(
      fetchUserById.fulfilled,
      (state, action: PayloadAction<User>) => {
        // both `state` and `action` are now correctly typed
        // based on the slice state and the `pending` action creator

        if (state.loading === 'pending') {
          state.loading = 'idle';
          state.users.push(action.payload);
        }
      }
    );
  },
});

export default usersSlice.reducer;
