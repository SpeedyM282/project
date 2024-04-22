import { client } from "./config";

export const createProxy = (data: any) => client.post("/proxy/add", data);

export const getProxies = () => client.get("/proxy/get");

export const searchByInn = (inn: number) =>
	client.post("/proxy/search/inn/partner", {
		params: {
			partnerInn: inn,
		},
	});

export const searchMyInn = (inn: number) =>
	client.get("/proxy/search/inn/i", {
		params: {
			myInn: inn,
		},
	});

export const deleteProxy = (proxyId: string) =>
	client.delete(`/proxy/delete/${proxyId}`);
