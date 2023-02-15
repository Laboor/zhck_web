import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";

const { pageNotFound } = styles;

function PageNotFound() {
	const navigate = useNavigate();

	const goHome = () => {
		navigate("/");
	};

	return (
		<Result
			status="404"
			title="404"
			className={pageNotFound}
			subTitle="对不起，您浏览的页面不存在！"
			extra={
				<Button type="primary" onClick={goHome}>
					返回首页
				</Button>
			}
		/>
	);
}

export default PageNotFound;
