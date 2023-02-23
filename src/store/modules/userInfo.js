import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/axios";
import api from "@/config/api";

export const userInfo = createSlice({
	name: "userInfo",
	initialState: {
		id: "",
		name: "",
		hasAuth: "",
		token: "",
		role: "",
		authRoute: [],
	},
	reducers: {
		updateUserInfo: (state, action) => {
			for (let key in action.payload) {
				if (state.hasOwnProperty(key)) {
					state[key] = action.payload[key];
				}
			}
		},
		clearUserInfo: (state) => {
			state.id = "";
			state.name = "";
			state.hasAuth = "";
			state.token = "";
			state.role = "";
			state.authRoute = "";
		},
	},
	extraReducers(builder) {
		builder
			.addCase(userLogin.pending, (state, action) => {})
			.addCase(userLogin.fulfilled, (state, action) => {
				const res = action.payload;
				state.id = res.userId;
				state.name = res.userName;
				state.hasAuth = true;
				state.token = res.token;
				state.role = res.role;
				state.authRoute = res.authRoute;
				// 将用户信息存储在本地
				const localUserInfo = JSON.stringify({
          id: state.id,
          name: state.name,
          token: state.token,
          role: state.role,
          authRoute: state.authRoute
        });
				localStorage.setItem("userInfo", localUserInfo);
			})
			.addCase(userLogin.rejected, (state, action) => {
				state.hasAuth = false;
			})
      .addCase(userLogout.fulfilled, (state, action) => {
        userInfo.caseReducers.clearUserInfo(state);
      })
	},
});

export const userLogin = createAsyncThunk("userLogin", async (userId, userPwd) => {
	const res = await axios.get(api.login);
	return res.data;
});

export const userLogout = createAsyncThunk("userLogout", async (userId) => {
	const res = await axios.get(api.logout);
	return res.data;
});

export const { updateUserInfo, clearUserInfo } = userInfo.actions;

export default userInfo.reducer;
