import MainLayout from "@/pages/MainLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Login from "@/pages/Login";
import lodash from "lodash";
import { convertToReactRoute } from "@/utils";

const defaultRoute = [
	{
		element: <MainLayout />,
		isLayout: true,
		children: [
			{
				path: "/",
				element: <Home />,
				meta: { title: "首页" },
			},
			{
				path: "/about",
				element: <About />,
				meta: { title: "公安“点对点”执行系统" },
			},
			// {
			//   path: '/about1',
			//   element: <About />,
			//   meta: { title: '法院“总对总”执行系统' }
			// },
			// {
			//   path: '/about2',
			//   element: <About />,
			//   meta: { title: '公安“总对总”执行系统' }
			// },
			// {
			//   path: '/about3',
			//   element: <About />,
			//   meta: { title: '国安“总对总”执行系统' }
			// },
			// {
			//   path: '/about4',
			//   element: <About />,
			//   meta: { title: '监委“总对总”执行系统' }
			// },
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "*",
		element: (
			<main style={{ padding: "1rem" }}>
				<p>There's nothing here!</p>
			</main>
		),
	},
];

// 添加异步路由
defaultRoute.appendRoute = function (authRoute) {
	let defaultRouteClone = lodash.cloneDeep(defaultRoute);
	defaultRouteClone.forEach((route) => {
		if (route.isLayout) {
			let reactAuthRoute = convertToReactRoute(authRoute);
			route.children = route.children.concat(reactAuthRoute);
		}
	});
	return defaultRouteClone;
}

export default defaultRoute;
