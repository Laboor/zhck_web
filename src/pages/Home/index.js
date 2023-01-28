import { useSelector, useDispatch } from "react-redux";
import { decrement, incrementByAmount } from "../../store/modules/counter";

function Home() {
	const dispatch = useDispatch();

	return (
		<div>
			Hello World
			<button
				onClick={() => {
					dispatch(incrementByAmount(50));
				}}
			>
				increment
			</button>
		</div>
	);
}

export default Home;
