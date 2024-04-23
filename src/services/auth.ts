import { authClient } from "./config";

export const login = (data: { name: string; password: string }) =>
	authClient.post("/enterprise/login", data).catch((e) => {
		if (e.response?.data?.message) {
			alert(e.response?.data?.message);
		} else {
			alert("Xatolik yuz berdi\nIltimos keyinroq urunib ko'ring");
		}
	});

export const signUp = (data: { inn: number; name: string; password: string }) =>
	authClient.post("/enterprise/register", data).catch((e) => {
		if (e.response?.data?.message) {
			alert(e.response?.data?.message);
		} else {
			alert("Xatolik yuz berdi\nIltimos keyinroq urunib ko'ring");
		}
	});
