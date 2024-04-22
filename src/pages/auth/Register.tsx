import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../services/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Divider, Stack, TextField, Typography } from "@mui/material";

interface FormData {
	inn: number;
	name: string;
	password: string;
}

const Register = () => {
	const navigate = useNavigate();

	const loginSchema = yup.object().shape({
		name: yup.string().required("Ism shart"),
		inn: yup.number().required("INN shart"),
		password: yup
			.string()
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
		signUp(data)
			.then(() => navigate("/login"))
			.catch(() => alert("Xatolik yuz berdi\nIltimos keyinroq urunib ko'ring"));
	};

	return (
		<Stack
			direction="column"
			gap={5}
			alignItems="center"
			width="500px"
			margin="150px auto"
		>
			<Typography variant="h4">Ro'yxatdan o'tish</Typography>

			<Stack
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				direction="column"
				gap={4}
				width="100%"
			>
				<TextField
					label="Ism"
					{...register("name")}
					error={!!errors.name}
					helperText={errors.name?.message}
				/>
				<TextField
					label="INN"
					type="number"
					{...register("inn")}
					error={!!errors.inn}
					helperText={errors.inn?.message}
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
					Ro'yxatdan o'tish
				</Button>
			</Stack>

			<Divider sx={{ width: "100%" }} />

			<Typography variant="subtitle1">
				Akkauntingiz bormi? <Link to="/login">Kirish</Link>
			</Typography>
		</Stack>
	);
};

export default Register;
