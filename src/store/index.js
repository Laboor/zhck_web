import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './modules/counter';
import authRouterReducer from './modules/authRouter';
import menuReducer from './modules/menu';

export default configureStore({
  reducer: {
    counter: counterReducer,
    authRouter: authRouterReducer,
    menu: menuReducer,
  }
})