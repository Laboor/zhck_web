import styles from "./index.module.less";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
	const userInfo = useSelector((state) => state.userInfo);
	const dispatch = useDispatch();
	const navigate = useNavigate();

  useEffect(() => {
    
  }, [userInfo.hasAuth])

	const onClick = ({ key }) => {
		switch (key) {
			case "1":
				console.log(userInfo);
				break;
			case "2":
				dispatch(userLogout()).then((res) => {
					console.log(res);
					localStorage.removeItem("userInfo");
					navigate("/login", { replace: true });
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
					<span className={user_name}>{userInfo.name}</span>
				</div>
			</Dropdown>
		</div>
	);
}

export default HeaderContent;
