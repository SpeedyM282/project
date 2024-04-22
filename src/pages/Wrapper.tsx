import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Wrapper = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			navigate("/dashboard");
		} else {
			navigate("/login");
		}
	}, []);

	return (
		<>
			<Outlet />
		</>
	);
};

export default Wrapper;
