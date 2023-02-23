import styles from "./index.module.less";
import gznxLogo from "@/assets/img/gzrc_logo.png";
import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "@/store/modules/userInfo";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { GlobalMessageContext } from "@/App";

const { loginPage, sysTitle, logo, loginForm, forgetPwd } = styles;

function Login() {
  console.log('login');
	const [isLogging, setIsLogging] = useState(false);
  const { getState } = useStore();
	const hasAuth = getState().userInfo.hasAuth;
	const message = useContext(GlobalMessageContext);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (hasAuth) {
			navigate("/", { replace: true });
		}
    if (hasAuth === false) {
      message.open({
        type: "error",
        content: "登录失败，账号或密码错误！",
      });
    }
	}, [hasAuth, message, navigate]);

	const onLogin = () => {
		setIsLogging(true);
		dispatch(userLogin()).then(() => setIsLogging(false));
	};

	const onFinish = (values) => {
		console.log("Received values of form: ", values);
	};

	const onForgetPwd = () => {
		message.open({
			type: "info",
			content: "请联系管理员重置密码！",
		});
	};

	return (
		<div className={loginPage}>
			<div className={sysTitle}>
				<img className={logo} alt="gzrc_logo" src={gznxLogo} width="70" />
				网络查控平台
			</div>
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
						<a className={forgetPwd} href onClick={onForgetPwd}>
							忘记密码
						</a>
					</Form.Item>
				</Form.Item>

				<Form.Item>
					<Button style={{ width: "100%" }} size="large" type="primary" htmlType="submit" onClick={onLogin} loading={isLogging}>
						登 录
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default Login;
