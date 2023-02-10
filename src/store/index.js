import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './modules/menu';
import userInfoReducer from './modules/userInfo';

export default configureStore({
  reducer: {
    menu: menuReducer,
    userInfo: userInfoReducer
  }
})