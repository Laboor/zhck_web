const { override, addLessLoader, addWebpackAlias, adjustStyleLoaders } = require("customize-cra");
const path = require("path");

module.exports = override(
	// less loader配置
	addLessLoader({
		lessOptions: {
			javascriptEnabled: true,
			localIdentName: "[path][name]-[local]--[hash:base64:5]",
		},
	}),
	// 此配置防止报错，原因未知
	adjustStyleLoaders(({ use: [, , postcss] }) => {
		const postcssOptions = postcss.options;
		postcss.options = { postcssOptions };
	}),
	// 路径别名配置
	addWebpackAlias({
		"@": path.resolve(__dirname, "src"),
	})
);
