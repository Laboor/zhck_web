import React, { lazy } from "react";
import lodash from "lodash";

// 懒加载函数
export function lazyLoad(moduleName) {
	const Module = lazy(() => import(`@/pages/${moduleName}`));
	return <Module />;
}


// 将路由转化为React路由
export function convertToReactRoute(routes) {
	const routeList = [];
	const routesClone = lodash.cloneDeep(routes);
	for (const route of routesClone) {
		if (!route.element) continue;
		route.element = lazyLoad(route.element);
		if (route.children) {
			convertToReactRoute(route.children);
		}
		routeList.push(route);
	}
	return routeList;
}

// 将路由转化为菜单
export function convertToMenu(routes, path) {
	const menuList = [];
	for (const route of routes) {
    // 路由无meta过滤
		if (!route.meta) continue;
    // 隐藏菜单过滤
    if (route.meta.hiddenInMenu) continue;
		const routePath = path ? `${path}/${route.path}` : route.path;
		const menu = {
			key: route.path,
			label: route.meta.title || "未命名菜单",
			icon: route.meta.icon,
		};
		if (route.children) {
			menu.children = convertToMenu(route.children, routePath);
		}
		menuList.push(menu);
	}
	return menuList;
}
