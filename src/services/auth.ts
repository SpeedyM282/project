import { authClient } from "./config";

export const login = (data: { name: string; password: string }) =>
	authClient.post("/enterprise/login", data);

export const signUp = (data: { inn: number; name: string; password: string }) =>
	authClient.post("/enterprise/register", data);
