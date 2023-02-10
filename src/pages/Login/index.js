import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "@/store/modules/userInfo";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

function Login() {
	const loginStatus = useSelector((state) => state.userInfo.loginStatus);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		if (loginStatus === "succeeded") {
			navigate("/", { replace: true });
		}
	}, [loginStatus, navigate]);

	const login = () => {
		dispatch(userLogin());
	};
	return (
		<div>
			<Button type="primary" onClick={() => login()}>
				登录
			</Button>
		</div>
	);
}

export default Login;
