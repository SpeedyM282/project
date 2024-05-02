import { client } from "./config";

export const createProxy = (data: any) =>
	client.post("/proxy/add", data).catch((e) => {
		if (e?.response?.data?.message) {
			alert(e.response?.data?.message);
		} else {
			alert("Xatolik yuz berdi\nIltimos keyinroq urunib ko'ring");
		}
	});

export const getProxies = (page: number) =>
	client
		.get("/proxy/get", {
			params: {
				page,
			},
		})
		.catch((e) => {
			if (e?.response?.status === 403) {
				alert("Siz tizimga kirmagansiz");
			} else if (e?.response?.data?.message) {
				alert(e.response?.data?.message);
			} else {
				alert("Xatolik yuz berdi\nIltimos keyinroq urunib ko'ring");
			}
		});

export const searchByInn = (inn: string) =>
	client.get(`/proxy/search/inn/partner/${inn}`).catch((e) => {
		if (e?.response?.data?.message) {
			alert(e.response?.data?.message);
		} else {
			alert("Xatolik yuz berdi\nIltimos keyinroq urunib ko'ring");
		}
	});

export const searchMyInn = (inn: string) =>
	client.get(`/proxy/search/inn/i/${inn}`).catch((e) => {
		if (e?.response?.data?.message) {
			alert(e.response?.data?.message);
		} else {
			alert("Xatolik yuz berdi\nIltimos keyinroq urunib ko'ring");
		}
	});

export const deleteProxy = (proxyId: string) =>
	client.delete(`/proxy/delete/${proxyId}`).catch((e) => {
		if (e?.response?.data?.message) {
			alert(e.response?.data?.message);
		} else {
			alert("Xatolik yuz berdi\nIltimos keyinroq urunib ko'ring");
		}
	});

export const getCatalog = () =>
	client.get("/proxy/katalog").catch((e) => {
		if (e?.response?.data?.message) {
			alert(e.response?.data?.message);
		} else {
			alert("Xatolik yuz berdi\nIltimos keyinroq urunib ko'ring");
		}
	});
