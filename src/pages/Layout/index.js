import { useState, useEffect } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { decrement, incrementByAmount } from "../../store/modules/counter";
import { setAsyncRoute } from "../../store/modules/asyncRoute";

function Layout() {
	const count = useSelector((state) => state.counter.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let [flag, setFlag] = useState(99);

	useEffect(() => {
		console.log(flag);
	}, [flag]);

	console.log("count", count);

	return (
		<div style={{ background: "green", height: "800px" }}>
			<button
				onClick={() => {
					dispatch(
						setAsyncRoute([
							{
								path: "/about",
								element: './pages/About',
							},
						])
					);
				}}
			>
				increment
			</button>
			<button
				onClick={() => {
					navigate("/about");
				}}
			>
				decrement
			</button>
			<Outlet />
		</div>
	);
}

export default Layout;
