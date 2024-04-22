import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const authClient = axios.create({
	baseURL: BASE_URL,
});

export const client = axios.create({
	baseURL: BASE_URL,
});

// TO TAKE EVERYTIME UP TO DATE ACCESS_TOKEN
client.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token") || "";

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
