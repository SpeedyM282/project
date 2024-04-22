import { useState } from "react";
import { proxySchema, FormData } from "./helper";
import CreateProxyTable from "./CreateProxyTable";
import { createProxy } from "../../services/proxy";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {
	Box,
	Stack,
	Button,
	Divider,
	TextField,
	Typography,
} from "@mui/material";

export interface IProduct {
	amount: number;
	productName: string;
	UnitOfMeasure: string;
	productCatalog: string;
}

const CreateProxy = () => {
	const navigate = useNavigate();
	const [products, setProducts] = useState<IProduct[]>([
		{
			amount: 0,
			productName: "",
			UnitOfMeasure: "",
			productCatalog: "",
		},
	]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(proxySchema),
	});

	const onSubmit: SubmitHandler<FormData> = (data) => {
		const newData = {
			...data,
			goods: products,
		};

		createProxy(newData)
			.then(() => {
				alert("Saqlandi✅");
				navigate("/dashboard");
			})
			.catch(() => alert("Xatolik yuz berdi\nIltimos keyinroq urunib ko'ring"));
	};

	return (
		<Stack
			p={5}
			gap={5}
			component="form"
			direction="column"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Stack direction="row" gap={5} alignItems="center">
				<Link to="/dashboard">
					<Stack direction="row" alignItems="center" gap={0.5}>
						<ArrowBackRoundedIcon />
						<Typography fontSize={18} fontWeight={600}>
							Orqaga
						</Typography>
					</Stack>
				</Link>
				<Typography variant="h4">Ishonchnoma yaratish</Typography>
			</Stack>

			<Divider />

			<Box
				sx={{
					p: 3,
					display: "flex",
					flexDirection: "column",
					gap: 3.5,
					borderRadius: 2,
					boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
				}}
			>
				<Stack direction="row" gap={3.5} flexWrap="wrap">
					<TextField
						type="number"
						label="Ishonchnoma raqami"
						{...register("proxyNumber")}
						error={!!errors.proxyNumber}
						helperText={errors.proxyNumber?.message}
						sx={{
							width: "300px",
						}}
					/>
					<TextField
						type="date"
						label="Berilgan sana"
						{...register("dateHead")}
						error={!!errors.dateHead}
						helperText={errors.dateHead?.message}
						InputLabelProps={{ shrink: true }}
						sx={{
							width: "300px",
						}}
					/>
					<TextField
						type="date"
						label="qadar amal qiladi"
						{...register("dateEnd")}
						error={!!errors.dateEnd}
						helperText={errors.dateEnd?.message}
						InputLabelProps={{ shrink: true }}
						sx={{
							width: "300px",
						}}
					/>
				</Stack>

				<Stack direction="row" gap={3.5} flexWrap="wrap">
					<TextField
						type="number"
						label="Shartnoma raqami"
						{...register("agreementNumber")}
						error={!!errors.agreementNumber}
						helperText={errors.agreementNumber?.message}
						sx={{
							width: "300px",
						}}
					/>
					<TextField
						type="date"
						label="Shartnoma sanasi"
						{...register("dateAgreement")}
						error={!!errors.dateAgreement}
						helperText={errors.dateAgreement?.message}
						InputLabelProps={{ shrink: true }}
						sx={{
							width: "300px",
						}}
					/>
				</Stack>
			</Box>

			<Divider />

			<Box
				sx={{
					p: 3,
					display: "flex",
					flexWrap: "wrap",
					gap: 7,
					borderRadius: 2,
					boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
				}}
			>
				<Stack
					width="100%"
					maxWidth="600px"
					direction="column"
					gap={5}
					minWidth="300px"
				>
					<Stack direction="column" gap={2}>
						<Typography variant="h5">Sizning malumotlaringiz</Typography>

						<TextField
							type="number"
							label="STIR/JSHSHIR"
							{...register("myEnterpriseInn")}
							error={!!errors.myEnterpriseInn}
							defaultValue={localStorage.getItem("inn")}
							helperText={errors.myEnterpriseInn?.message}
						/>
					</Stack>

					<Stack direction="column" gap={2}>
						<Typography variant="h5">Tashkilot</Typography>

						<TextField
							label="Nomi"
							{...register("myEnterpriseName")}
							error={!!errors.myEnterpriseName}
							helperText={errors.myEnterpriseName?.message}
						/>

						<Stack width="100%" direction="row" gap={2}>
							<TextField
								fullWidth
								type="number"
								label="Hisob raqami"
								{...register("myAccountNumber")}
								error={!!errors.myAccountNumber}
								helperText={errors.myAccountNumber?.message}
							/>
							<TextField
								fullWidth
								type="number"
								label="MFO/SWIFT va boshqalar"
								{...register("mySWFT")}
								error={!!errors.mySWFT}
								helperText={errors.mySWFT?.message}
							/>
						</Stack>

						<TextField
							label="Manzil"
							{...register("myAddress")}
							error={!!errors.myAddress}
							helperText={errors.myAddress?.message}
						/>

						<Stack width="100%" direction="row" gap={2}>
							<TextField
								fullWidth
								label="Direktor"
								{...register("myBoss")}
								error={!!errors.myBoss}
								helperText={errors.myBoss?.message}
							/>
							<TextField
								fullWidth
								label="Bosh hisobchi"
								{...register("myBoss")}
								error={!!errors.myBoss}
								helperText={errors.myBoss?.message}
							/>
						</Stack>
					</Stack>
				</Stack>

				<Stack
					width="100%"
					maxWidth="600px"
					direction="column"
					gap={5}
					minWidth="300px"
				>
					<Stack direction="column" gap={2}>
						<Typography variant="h5">Kontragent malumotlari</Typography>

						<TextField
							type="number"
							label="STIR/JSHSHIR"
							{...register("hisEnterpriseInn")}
							error={!!errors.hisEnterpriseInn}
							helperText={errors.hisEnterpriseInn?.message}
						/>
					</Stack>

					<Stack direction="column" gap={2}>
						<Typography variant="h5">Hamkoringizning korxonasi</Typography>

						<TextField
							label="Nomi"
							{...register("hisEnterpriseName")}
							error={!!errors.hisEnterpriseName}
							helperText={errors.hisEnterpriseName?.message}
						/>

						<Stack width="100%" direction="row" gap={2}>
							<TextField
								fullWidth
								type="number"
								label="Hisob raqami"
								{...register("hisAccountNumber")}
								error={!!errors.hisAccountNumber}
								helperText={errors.hisAccountNumber?.message}
							/>
							<TextField
								fullWidth
								type="number"
								label="MFO/SWIFT va boshqalar"
								{...register("hisSWFT")}
								error={!!errors.hisSWFT}
								helperText={errors.hisSWFT?.message}
							/>
						</Stack>

						<TextField
							label="Manzil"
							{...register("hisAddress")}
							error={!!errors.hisAddress}
							helperText={errors.hisAddress?.message}
						/>

						<Stack width="100%" direction="row" gap={2}>
							<TextField
								fullWidth
								label="Direktor"
								{...register("hisBoss")}
								error={!!errors.hisBoss}
								helperText={errors.hisBoss?.message}
							/>
							<TextField
								fullWidth
								label="Bosh hisobchi"
								{...register("hisBoss")}
								error={!!errors.hisBoss}
								helperText={errors.hisBoss?.message}
							/>
						</Stack>
					</Stack>
				</Stack>
			</Box>

			<Divider />

			<Box
				sx={{
					p: 3,
					display: "flex",
					flexDirection: "column",
					gap: 3.5,
					borderRadius: 2,
					boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
				}}
			>
				<Typography variant="h5">Ishonchli vakil</Typography>
				<Stack direction="row" gap={3.5} flexWrap="wrap">
					<TextField
						type="number"
						label="Ishonchli vakil JSHSHIRi"
						{...register("ReliableJSHR")}
						error={!!errors.ReliableJSHR}
						helperText={errors.ReliableJSHR?.message}
						sx={{
							width: "400px",
						}}
					/>
					<TextField
						label="FISH"
						{...register("ReliableFIO")}
						error={!!errors.ReliableFIO}
						helperText={errors.ReliableFIO?.message}
						sx={{
							width: "400px",
						}}
					/>
					<TextField
						label="Lavozimi"
						{...register("ReliablePosition")}
						error={!!errors.ReliablePosition}
						helperText={errors.ReliablePosition?.message}
						sx={{
							width: "400px",
						}}
					/>
				</Stack>

				<Stack direction="row" gap={3.5} flexWrap="wrap">
					<TextField
						label="Pasport seriya va raqami"
						{...register("ReliablePassport")}
						error={!!errors.ReliablePassport}
						helperText={errors.ReliablePassport?.message}
						sx={{
							width: "400px",
						}}
					/>
					<TextField
						label="Kim tomonidan berilgan"
						{...register("GivenByWhom")}
						error={!!errors.GivenByWhom}
						helperText={errors.GivenByWhom?.message}
						sx={{
							width: "400px",
						}}
					/>
					<TextField
						type="date"
						label="Berilgan sana"
						{...register("givenDate")}
						error={!!errors.givenDate}
						helperText={errors.givenDate?.message}
						InputLabelProps={{ shrink: true }}
						sx={{
							width: "400px",
						}}
					/>
				</Stack>
			</Box>

			<Divider />

			<CreateProxyTable products={products} setProducts={setProducts} />

			<Stack direction="row" gap={5} justifyContent="center">
				<Button variant="contained" color="success" type="submit">
					Imzolash
				</Button>
				<Button variant="outlined" color="error" onClick={() => navigate(-1)}>
					Bekor qilish
				</Button>
			</Stack>
		</Stack>
	);
};

export default CreateProxy;