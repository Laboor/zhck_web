/**
 * @module ErrorBoundary
 * @desc  错误边界组件，用于捕获UI渲染时发生的错误，无法捕获事件中错误
 * @version 1.0
 * @date 2023-01-31
 * @author xp
 */

import React from "react";
import { FrownOutlined } from "@ant-design/icons";
import { Result, Button } from "antd";
import styles from "./index.module.less";

const { errorBoundaryWapper } = styles;

function ErrorBoundaryWapper(props) {
	return <div className={errorBoundaryWapper}>{props.children}</div>;
}

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// 错误边界处理
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			if (this.props.element) {
				return <ErrorBoundaryWapper>{this.props.element}</ErrorBoundaryWapper>;
			}
			return (
				<ErrorBoundaryWapper>
					<Result
						icon={<FrownOutlined style={{ color: "#ef9c36" }} />}
						title="很抱歉，发生了未知错误"
						extra={<Button type="primary">返回首页</Button>}
					/>
				</ErrorBoundaryWapper>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
