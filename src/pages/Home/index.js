import { useState, useRef, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import defaultRoute from "@/config/defaultRoute";
import { updateUserInfo } from "@/store/modules/userInfo";

function Home(props) {
	console.log('子组件刷新了', props);
	const navigate = useNavigate();
	const dispatch = useDispatch();


	return (
		<div>
			Hello World
			<button onClick={() => {
				// navigate('/login');
				console.log('1111111111');
				dispatch(updateUserInfo({
					name: 'ak47'
				}));
			}}>111</button>
		</div>
	);
}

export default Home;
