import styles from "./index.module.less";
import React, { useContext, Suspense } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import HeaderContent from "@/components/HeaderContent";
import { MenuContext } from "@/App";

const { layout, header, logo, sider, siderMenu, breadcrumb, content } = styles;
const { Header, Content, Sider } = Layout;

function MainLayout() {
	const MenuCfg = useContext(MenuContext);
	const navigate = useNavigate();
	const location = useLocation();

	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Layout className={layout}>
			<Header className={header}>
				<div className={logo} />
				<HeaderContent></HeaderContent>
			</Header>
			<Layout>
				<Sider
					className={sider}
					width={250}
					style={{
						background: colorBgContainer,
					}}
				>
					<Menu
						className={siderMenu}
						mode="inline"
						defaultSelectedKeys={["1"]}
						defaultOpenKeys={["sub1"]}
						items={MenuCfg}
						onClick={({ keyPath }) => {
							const routePath = keyPath.reverse().join("/");
							console.log(location.pathname, routePath);
							if (location.pathname !== routePath) {
								navigate(routePath);
							}
						}}
					/>
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
						<Suspense>
							<Outlet />
						</Suspense>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
}

export default MainLayout;
