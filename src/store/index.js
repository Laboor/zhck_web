import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './modules/counter';
import authRouterReducer from './modules/authRouter';
import menuReducer from './modules/menu';
import userReducer from './modules/user';

export default configureStore({
  reducer: {
    counter: counterReducer,
    authRouter: authRouterReducer,
    menu: menuReducer,
    user: userReducer
  }
})