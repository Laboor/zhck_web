import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/axios';
import api from '@/config/api';

export const userInfo = createSlice({
  name: 'userInfo',
  initialState: {
    id: '',
    name: '',
    loginStatus: '',
    token: '',
    role: '',
    authRoute: [],
  },
  reducers: {
		setAuthRoute: (state, action) => {
			state.authRoute = action.payload;
		},
    clearUserInfo: (state) => {
      state.id = '';
      state.name = '';
      state.loginStatus = '';
      state.token = '';
      state.role = '';
      state.authRoute = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.loginStatus = 'logging';
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        const res = action.payload;
        state.id = res.userId;
        state.name = res.userName;
        state.loginStatus = 'succeeded';
        state.token = res.token;
        state.role = res.role;
        state.authRoute = res.authRoute;
				// 将用户信息存储在本地
				const localUserInfo = JSON.stringify(state);
				localStorage.setItem('userInfo', localUserInfo);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loginStatus = 'failed';
      });
  },
});

export const userLogin = createAsyncThunk(
  'userLogin',
  async (userId, userPwd) => {
    const res = await axios.get(api.login);
    return res.data;
  }
);

export const userLogout = createAsyncThunk('userLogout', async (userId) => {
  const res = await axios.get(api.logout);
  return res.data;
});

export const { setAuthRoute, clearUserInfo } = userInfo.actions;

export default userInfo.reducer;
