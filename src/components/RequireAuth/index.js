import styles from "./index.module.less";
import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { updateUserInfo, clearUserInfo } from "@/store/modules/userInfo";
import { Spin } from "antd";
import axios from "@/axios";
import cryptoJS from "crypto-js";
import api from "@/config/api";
import { GlobalMessageContext } from "@/App";

const { blankPage } = styles;

// 获取用户Token
function getUserToken(userInfo) {
	let userToken = null;
	// 从localStorage获取路由
	if (userInfo && userInfo.token) {
		const tokenArr = userInfo.token.split(".");
		// 是否有效的JWT格式
		if (tokenArr.length === 3) {
			const jwtPayload = JSON.parse(window.atob(tokenArr[1])); // base64解码
			const authRouteHash = cryptoJS.MD5(JSON.stringify(userInfo.authRoute)).toString(); // 将异步路由进行MD5摘要计算
			jwtPayload.authRouteHash = authRouteHash; // 重新赋值路由hash，以校验路由有效性，防篡改
			tokenArr[1] = window.btoa(jwtPayload); // base64编码
			userToken = "Bearer " + tokenArr.join(".");
		}
	}
	return userToken;
}

function RequireAuth(props) {
	const message = useContext(GlobalMessageContext);
	const { getState } = useStore();
	const hasAuth = getState().userInfo.hasAuth;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userInfo = JSON.parse(localStorage.getItem("userInfo"));

	useEffect(() => {
		if (hasAuth) return;
		// 异步路由权限校验
		axios
			.get(api.authVerification, {
				headers: {
					Authorization: getUserToken(userInfo),
				},
			})
			.then((res) => {
				if (res.data.verify) {
					// 校验成功
					dispatch(
						updateUserInfo({
							id: userInfo.id,
							name: userInfo.name,
							token: userInfo.token,
							hasAuth: true,
							role: userInfo.role,
							authRoute: userInfo.authRoute,
						})
					);
				} else {
					// 校验失败
					// TODO...整合成自定义Hook useLogout
					localStorage.removeItem("userInfo");
					dispatch(clearUserInfo());
					message.open({
						type: "error",
						content: "登录权限过期，请重新登录！",
					});
					navigate("/login", { replace: true });
				}
			});
	}, [userInfo, hasAuth, message, navigate, dispatch]);

	return hasAuth ? (
		props.children
	) : (
		<div className={blankPage}>
			<Spin tip="Loading" size="large" delay={100} />
		</div>
	);
}

export default RequireAuth;
