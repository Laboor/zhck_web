import styles from "./App.module.less";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import React from "react";
import defaultRoute from "./config/defaultRoute";
import { useSelector } from "react-redux";
import { convertToMenu } from "@/utils";
import { ConfigProvider } from "antd";
import { setMenu } from "@/store/modules/menu";
import { setAuthRoute } from "@/store/modules/authRouter";

const { app } = styles;

export const MenuContext = React.createContext(convertToMenu(getRootRouteChildren(defaultRoute)));

function getRootRouteChildren(routes) {
	return routes.find((item) => item.isRoot).children;
}

function App() {
	const authRoute = useSelector((state) => state.authRouter.list);
	const routerCfg = defaultRoute.appendRoute(authRoute);
	const router = createBrowserRouter(routerCfg);
	const menuCfg = convertToMenu(getRootRouteChildren(routerCfg));
	console.log(menuCfg);

	return (
		<div className={app}>
			<Suspense fallback={<div>Loading...</div>}>
				<MenuContext.Provider value={menuCfg}>
					<RouterProvider router={router} />
				</MenuContext.Provider>
			</Suspense>
		</div>
	);
}

export default App;
