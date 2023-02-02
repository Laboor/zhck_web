import { createSlice } from '@reduxjs/toolkit';

export const authRouter = createSlice({
  name: 'asyncRoute',
  initialState: {
    list: []
  },
  reducers: {
    setAuthRoute: (state, action) => {
      state.list = action.payload;
    },
  }
})

export const { setAuthRoute } = authRouter.actions

export default authRouter.reducer