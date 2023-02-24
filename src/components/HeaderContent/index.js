import styles from "./index.module.less";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Space, Dropdown, message } from "antd";
import { userLogout } from "@/store/modules/userInfo";

const { header_content_wrapper, user_info_warpper, user_avatar, user_name } = styles;

const items = [
	{
		label: "个人信息",
		icon: <UserOutlined />,
		key: "1",
	},
	{
		type: "divider",
	},
	{
		label: "退出登录",
		icon: <LogoutOutlined />,
		danger: true,
		key: "2",
	},
];

function HeaderContent() {
  console.log('55555555555555');
	// const userInfo = useSelector((state) => state.userInfo);
  const { getState } = useStore();
	const name = getState().userInfo.name;
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onClick = ({ key }) => {
		switch (key) {
			case "1":
				// console.log(userInfo);
        console.log(getState().userInfo.name);
				break;
			case "2":
        localStorage.removeItem("userInfo");
        navigate("/login", { replace: true });
				dispatch(userLogout()).then((res) => {
					console.log(res);
					
				});
				break;
			default:
				break;
		}
	};

	return (
		<div className={header_content_wrapper}>
			<Dropdown
				menu={{
					items,
					onClick,
				}}
			>
				<div className={user_info_warpper}>
					<Avatar className={user_avatar} icon={<UserOutlined />} size="small" />
					<span className={user_name}>{name}</span>
				</div>
			</Dropdown>
		</div>
	);
}

export default HeaderContent;
