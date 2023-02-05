import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/axios';

export const user = createSlice({
  name: 'counter',
  initialState: {
    id: '',
    name: '',
    loginStatus: false,
    token: '',
    role: '',
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.loginStatus = 'logging';
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state = {
          id: '123',
          name: 'Avalon',
          loginStatus: 'succeeded',
          token: '123456789',
          role: 'admin',
        };
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loginStatus = 'failed';
      });
  },
});

export const userLogin = createAsyncThunk('userLogin', async (userName) => {
  console.log(userName)
  const res = await axios.get('/login');
  return res.data;
});

export const userLogout = createAsyncThunk('userLogout', async () => {
  const res = await axios.get('/logout');
  return res.data;
});

export const { setUserInfo } = user.actions;

export default user.reducer;
