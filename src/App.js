import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, useState, useEffect } from "react";
import defaultRouterCfg from "./config/router";
import { useSelector } from "react-redux";
import lodash from 'lodash'

function App() {
	let routerCfg = defaultRouterCfg.concat(); // 数组深拷贝
	const asyncRoute = useSelector((state) => state.asyncRoute.value);
  let asyncRouteCfg = lodash.cloneDeep(asyncRoute);
	for (let route of asyncRouteCfg) {
     const Module = lazy(() => import('./pages/About'));
     route.element = <Module />;
		 routerCfg[0].children.push(route);
	}
  console.log(routerCfg);
	// const [routerCfg, setRouterCfg] = useState(defaultRouterCfg);
	const router = createBrowserRouter(routerCfg);

	// useEffect(() => {
	//   setRouterCfg(routerCfg);
	// }, [routerCfg]);

	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
