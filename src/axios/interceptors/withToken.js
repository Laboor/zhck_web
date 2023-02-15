const withToken = {
	onFulfilled: (config) => {
		const userInfo = JSON.parse(localStorage.getItem("userInfo"));
		if (!config.headers.Authorization && userInfo && userInfo.token) {
			config.headers.Authorization = "Bearer " + userInfo.token;
		}
		return config;
	},
};

export default withToken;
