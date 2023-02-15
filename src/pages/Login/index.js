import styles from "./index.module.less";
import { useState, useEffect, useCallback, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "@/store/modules/userInfo";
import { useNavigate } from "react-router-dom";
import { GlobalMessageContext } from "@/App";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

const { loginPage, loginForm, forgetPwd } = styles;

function Login() {
	const loginStatus = useSelector((state) => state.userInfo.loginStatus);
	const message = useContext(GlobalMessageContext);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		switch (loginStatus) {
			case "succeeded":
				navigate("/", { replace: true });
				break;
			case "failed":
				message.open({
					type: "error",
					content: "登录失败，账号或密码错误！",
				});
				break;
			default:
				break;
		}
	}, [loginStatus, message, navigate]);

	const login = () => {
		dispatch(userLogin());
	};

	const onFinish = (values) => {
		console.log("Received values of form: ", values);
	};

	return (
		<div className={loginPage}>
			<Form
				name="normal_login"
				className={loginForm}
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
			>
				<Form.Item
					name="username"
					rules={[
						{
							required: true,
							message: "请输入您的工号！",
						},
					]}
				>
					<Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入工号" />
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: "请输入您的密码！",
						},
					]}
				>
					<Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="请输入密码" />
				</Form.Item>
				<Form.Item>
					<Form.Item name="remember" valuePropName="checked" noStyle>
						<Checkbox>自动登录</Checkbox>
						<a className={forgetPwd} href>
							忘记密码
						</a>
					</Form.Item>
				</Form.Item>

				<Form.Item>
					<Button style={{ width: "100%" }} size="large" type="primary" htmlType="submit" onClick={login}>
						登 录
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default Login;
