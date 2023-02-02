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
export function convertToMenu(routes) {
  const menuList = [];
  const routesClone = lodash.cloneDeep(routes);
  for (const route of routesClone) {
    const menu = {
      key: '',
      label: route.meta.title,
      icon: route.meta.icon,
      element: route.element
    }
    if (route.children) {
			menu.children = convertToMenu(route.children);
		}
    menuList.push(menu);
  }
  return menuList
}