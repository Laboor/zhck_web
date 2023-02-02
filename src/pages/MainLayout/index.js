import React from "react";
import { Outlet } from "react-router-dom";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import styles from "./index.module.less";
import { useSelector, useDispatch } from "react-redux";
import { setAuthRoute } from "@/store/modules/authRouter";

const { layout, header, logo, sider, siderMenu, breadcrumb, content } = styles;
const { Header, Content, Sider } = Layout;


function MainLayout() {
	// const routerCfg = useSelector((state) => state.asyncRoute.value);
	// console.log(routerCfg[0]);
	// const menuList = routerCfg[0].children.map((item, index) => {
	// 	const key = String(index + 1);
	// 	return {
	// 		key: key,
	// 		label: item.meta.title
	// 	}
	// })

	const menuList = useSelector((state) => state.menu.list);
	console.log(menuList);
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Layout className={layout}>
			<Header className={header}>
				<div className={logo} />
			</Header>
			<Layout>
				<Sider
					className={sider}
					width={250}
					style={{
						background: colorBgContainer,
					}}
				>
					<Menu className={siderMenu} mode="inline" defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} items={menuList} />
				</Sider>
				<Layout style={{ background: "#eff1f4" }}>
					<Breadcrumb className={breadcrumb}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>
					<Content
						className={content}
						style={{
							background: colorBgContainer,
						}}
					>
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
}

export default MainLayout;