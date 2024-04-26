import Wrapper from "./pages/Wrapper";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CreateProxy from "./pages/proxy/CreateProxy";
import Dashboard from "./pages/dashboard/Dashboard";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Wrapper />,
		children: [
			{
				path: "/*",
				element: <></>,
			},
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
