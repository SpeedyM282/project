import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { login } from "../../services/auth";

interface FormData {
	name: string;
	password: string;
}

const Login = () => {
	const navigate = useNavigate();

	const loginSchema = Yup.object().shape({
		name: Yup.string().required("Ism shart"),
		password: Yup.string()
			.required("Parol shart")
			.min(8, "Parol uzunligi 8 ko'p bo'lishi shart"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(loginSchema),
	});

	const onSubmit: SubmitHandler<FormData> = (data) => {
		login(data).then((res: any) => {
			if (res?.data) {
				localStorage.setItem("token", res?.data?.token || "");
				localStorage.setItem("inn", res?.data?.enterprise?.inn || "");
				localStorage.setItem("name", res?.data?.enterprise?.name || "");
				navigate("/dashboard");
			}
		});
	};

	return (
		<Stack
			direction="column"
			gap={5}
			alignItems="center"
			width="500px"
			margin="150px auto"
		>
			<Typography variant="h4">Kirish</Typography>

			<Stack
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				direction="column"
				gap={4}
				width="100%"
			>
				<TextField
					label="Korxona nomi"
					{...register("name")}
					error={!!errors.name}
					helperText={errors.name?.message}
				/>
				<TextField
					label="Parol"
					{...register("password")}
					error={!!errors.password}
					helperText={errors.password?.message}
				/>

				<Button
					type="submit"
					variant="contained"
					sx={{ width: "fit-content", margin: "0 auto" }}
				>
					Kirish
				</Button>
			</Stack>

			<Divider sx={{ width: "100%" }} />

			<Typography variant="subtitle1">
				Akkauntingiz yo'qmi? <Link to="/register">Ro'yxatdan o'tish</Link>
			</Typography>
		</Stack>
	);
};

export default Login;
