import { createSlice } from '@reduxjs/toolkit';

export const asyncRoute = createSlice({
  name: 'asyncRoute',
  initialState: {
    value: []
  },
  reducers: {
    setAsyncRoute: (state, action) => {
      state.value = action.payload;
    },
    clearAsyncRoute: (state) => {
      state.value = [];
    }
  }
})

export const { setAsyncRoute, clearAsyncRoute } = asyncRoute.actions

export default asyncRoute.reducer