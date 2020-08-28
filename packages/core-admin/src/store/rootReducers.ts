import { combineReducers } from '@reduxjs/toolkit';

import crudReduxSlice from '@modules/CrudRedux/CrudReduxSlice';

const rootReducer = combineReducers({
  users: crudReduxSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
