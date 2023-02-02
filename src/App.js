import styles from "./App.module.less";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import React from "react";
import defaultRoute from "./config/defaultRoute";
import { useSelector } from "react-redux";
import { ConfigProvider } from "antd";
import { setMenu } from "@/store/modules/menu";
import { setAuthRoute } from "@/store/modules/authRouter";

const { app } = styles;

function App() {
	const authRoute = useSelector((state) => state.authRouter.list);
	const routerCfg = defaultRoute.appendRoute(authRoute);
	const router = createBrowserRouter(routerCfg);

	return (
		<div className={app}>
			<Suspense fallback={<div>Loading...</div>}>
				<RouterProvider router={router} />
			</Suspense>
		</div>
	);
}

export default App;
