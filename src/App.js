import styles from "./App.module.less";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import React from "react";
import defaultRoute from "./config/defaultRoute";
import { useSelector, useDispatch } from "react-redux";
import { convertToMenu } from "@/utils";
import { userLogin } from "@/store/modules/userInfo";
import axios from "@/axios";
import { message } from "antd";

const { app } = styles;

export const MenuContext = React.createContext(convertToMenu(getRootRouteChildren(defaultRoute)));
export const GlobalMessageContext = React.createContext();

function getRootRouteChildren(routes) {
	return routes.find((item) => item.isRoot).children;
}

function App() {
	const [messageApi, contextHolder] = message.useMessage();
	const authRoute = useSelector((state) => state.userInfo.authRoute);
	const routerCfg = defaultRoute.appendRoute(authRoute);
	const router = createBrowserRouter(routerCfg);
	const menu = convertToMenu(getRootRouteChildren(routerCfg));

	return (
		<div className={app}>
			{contextHolder}
			<GlobalMessageContext.Provider value={messageApi}>
				<Suspense fallback={<div>Loading...</div>}>
					<MenuContext.Provider value={menu}>
						<RouterProvider router={router} />
					</MenuContext.Provider>
				</Suspense>
			</GlobalMessageContext.Provider>
		</div>
	);
}

export default App;
