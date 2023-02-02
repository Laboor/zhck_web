import { createSlice } from "@reduxjs/toolkit";

export const menu = createSlice({
	name: "menu",
	initialState: {
		list: [],
	},
	reducers: {
		setMenu: (state, action) => {
			const routes = action.payload;
			const layoutRoute = routes.filter((route) => route.name === "MainLayout");
			if (layoutRoute.children) {
				state.list = layoutRoute.children.map((item, index) => {
					const key = String(index + 1);
					return {
						key: key,
						label: item.meta.title,
					};
				});
			} else {
				state.list = [];
			}
		},
	},
});

function routeConvertToMenu(routes) {
  const menuList = [];
	for (const route of routes) {
    if (!route.meta) continue;
		const menu = {
			key: route.meta.title,
			label: route.meta.title || '未命名菜单',
			icon: route.meta.icon,
		};
    if (route.children) {
      menu.children = routeConvertToMenu(route.children);
    }
    menuList.push(menu);
	}
  return menuList;
}

// function routeConvertToMenu(route) {
//   const menuItem = {
//     key: '',
//     label: route.meta.title,
//     icon: route.meta.icon,
//     children: []
//   }
//   return {

//   }
// }

export const { setMenu } = menu.actions;

export default menu.reducer;
