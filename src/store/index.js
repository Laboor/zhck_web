import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './modules/counter';
import asyncRouteReducer from './modules/asyncRoute';

export default configureStore({
  reducer: {
    counter: counterReducer,
    asyncRoute: asyncRouteReducer
  }
})