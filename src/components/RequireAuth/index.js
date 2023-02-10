import { useState, useEffect, useContext, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "@/config/api";
import axios from "@/axios";
import { refreshTokenAuthTime, clearUserInfo } from "@/store/modules/userInfo";
import { GlobalMessageContext } from "@/App";

const authTimeInterval = 5 * 60 * 1000; // 5分钟

function RequireAuth(props) {
	console.log(333333333333);
	const [hasAuth, setHasAuth] = useState(false);
	const tokenAuthTime = useSelector((state) => state.userInfo.tokenAuthTime);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const message = useContext(GlobalMessageContext);

	useEffect(() => {
		if (Date.now() - tokenAuthTime > authTimeInterval) {
			axios
				.get(api.authVerification, {
					// params: {
					// 	token: token,
					// },
				})
				.then((res) => {
					if (res.data.verify) {
						setHasAuth(true);
						dispatch(refreshTokenAuthTime());
					} else {
						setHasAuth(false);
						dispatch(clearUserInfo());
						message.open({
							type: "error",
							content: "登录权限过期，请重新登录！",
						});
						navigate("/login", { replace: true });
					}
				});
		} else {
			setHasAuth(true);
		}
	}, []);
	return hasAuth ? props.children : null;
}

export default RequireAuth;
