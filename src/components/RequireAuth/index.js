import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "@/config/api";
import axios from "@/axios";
import { GlobalMessageContext } from "@/App";
import { clearUserInfo } from "@/store/modules/userInfo";
import { Spin } from "antd";
import styles from "./index.module.less";

const { blankPage } = styles;

function RequireAuth(props) {
	const [hasAuth, setHasAuth] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const message = useContext(GlobalMessageContext);

	useEffect(() => {
		const userInfo = JSON.parse(localStorage.getItem("userInfo"));
		console.log(userInfo);
		axios
			.get(api.authVerification, {
				// params: {
				// 	token: token,
				// },
			})
			.then((res) => {
				if (res.data.verify) {
					setHasAuth(true);
				} else {
					setHasAuth(false);
					localStorage.removeItem("userInfo");
					dispatch(clearUserInfo());
					message.open({
						type: "error",
						content: "登录权限过期，请重新登录！",
					});
					navigate("/login", { replace: true });
				}
			});
	}, [hasAuth, message, navigate, dispatch]);

	return hasAuth ? (
		props.children
	) : (
		<div className={blankPage}>
			<Spin tip="Loading" size="large" delay={100} />
		</div>
	);
}

export default RequireAuth;
