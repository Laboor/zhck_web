import { useState, useRef, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, incrementByAmount } from "../../store/modules/counter";
import { useNavigate } from "react-router-dom";
import { setAuthRoute } from "@/store/modules/authRouter";
import defaultRoute from "@/config/defaultRoute";

function Home(props) {
	console.log('子组件刷新了', props);
	const [count, setCount] = useState(0);
	const memoCount = useMemo(() => {
		return count + 100;
	}, [count]);

	const navigate = useNavigate();
	const dispatch = useDispatch();


	return (
		<div>
			Hello World
			<button
				onClick={() => {
					dispatch(setAuthRoute([
						{
							path: '/about1',
							element: 'About',
							meta: { title: '法院“总对总”执行系统' }
						},
						{
							path: '/about2',
							element: 'About',
							meta: { title: '公安“总对总”执行系统' }
						},
						{
							path: '/about3',
							element: 'About',
							meta: { title: '国安“总对总”执行系统' }
						},
						{
							path: '/about4',
							element: 'About',
							meta: { title: '监委“总对总”执行系统' }
						},
					]));
					// setCount(count + 1);
				}}
			>
				{count}|{memoCount}
			</button>
			<button onClick={() => {
				navigate('/about3');
			}}>111</button>
		</div>
	);
}

export default Home;
