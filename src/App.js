import styles from "./App.module.less";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";
import defaultRouterCfg from "./config/router";
import { useSelector, useDispatch } from "react-redux";
import lodash from "lodash";
import { ConfigProvider } from "antd";
import { setAsyncRoute } from "@/store/modules/asyncRoute";

const { AppStyle } = styles;

function App() {
	const dispatch = useDispatch();
	let routerCfg = defaultRouterCfg.concat(); // 数组深拷贝
	dispatch(setAsyncRoute(routerCfg));

	// const asyncRoute = useSelector((state) => state.asyncRoute.value);
	// let asyncRouteCfg = lodash.cloneDeep(asyncRoute);
	// for (let route of asyncRouteCfg) {
	// 	const Module = lazy(() => import("./pages/About"));
	// 	route.element = <Module />;
	// 	routerCfg[0].children.push(route);
	// }
	const router = createBrowserRouter(routerCfg);

	return (
		<div className={AppStyle}>
			<Suspense fallback={<div>Loading...</div>}>
				<RouterProvider router={router} />
			</Suspense>
		</div>
	);
}

export default App;
