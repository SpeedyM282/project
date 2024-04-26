import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Wrapper = () => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (!token && location.pathname !== "/register") {
			navigate("/login");
		} else if (token && location.pathname === "/") {
			navigate("/dashboard");
		}
	}, [location.pathname]);

	return (
		<>
			<Outlet />
		</>
	);
};

export default Wrapper;
