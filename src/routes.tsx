import Dashboard from "./pages/Dashboard";
import Wrapper from "./pages/Wrapper";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CreateProxy from "./pages/proxy/CreateProxy";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Wrapper />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
			{
				path: "/proxy-create",
				element: <CreateProxy />,
			},
		],
	},
]);
