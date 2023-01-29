import { useState, useRef, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, incrementByAmount } from "../../store/modules/counter";

function Home(props) {
	console.log('子组件刷新了', props);
	const [count, setCount] = useState(0);
	const memoCount = useMemo(() => {
		return count + 100;
	}, [count]);

	return (
		<div>
			Hello World
			<button
				onClick={() => {
					setCount(count + 1);
				}}
			>
				{count}|{memoCount}
			</button>
		</div>
	);
}

export default Home;
