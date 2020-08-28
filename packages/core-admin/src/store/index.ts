import {
  configureStore,
  getDefaultMiddleware,
  MiddlewareArray,
} from '@reduxjs/toolkit';

import rootReducer from './rootReducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: new MiddlewareArray().concat(...getDefaultMiddleware()),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;

export default store;
