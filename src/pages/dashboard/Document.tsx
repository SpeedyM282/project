import {
	Divider,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import React from "react";

const Document = React.forwardRef(({ printData }: any, ref: any) => {
	return (
		<Stack ref={ref} p={5}>
			<Stack direction="column" gap={0.5}>
				<Typography variant="h6">{printData?._id}</Typography>
				<Divider sx={{ width: "50%" }} />
				<Typography variant="subtitle1">
					Elektron xujjat identifikatori
				</Typography>
			</Stack>

			<Typography variant="h3" mt={10} textAlign="center">
				Ishonchnoma {printData?.proxyNumber}
			</Typography>

			<Stack mt={10}>
				<Typography fontSize={24}>
					<b>Berilgan sana:</b> {new Date(printData?.dateHead).getDate()}.
					{new Date(printData?.dateHead).getMonth()}.
					{new Date(printData?.dateHead).getFullYear()}
				</Typography>
				<Typography fontSize={24}>
					<b>Amal qilish sanasi:</b> {new Date(printData?.dateEnd).getDate()}.
					{new Date(printData?.dateEnd).getMonth()}.
					{new Date(printData?.dateEnd).getFullYear()}
				</Typography>
				<Typography fontSize={24}>
					<b>Korxona nomi:</b> "{printData?.myEnterpriseName}"
				</Typography>
				<Typography fontSize={24}>
					<b>Manzil:</b> {printData?.myAddress}
				</Typography>
				<Typography fontSize={24}>
					<b>STIR:</b> {printData?.myEnterpriseInn}
				</Typography>
				<Typography fontSize={24}>
					<b>Ishonchnoma berildi: FISH:</b> {printData?.ReliableFIO}
				</Typography>
				<Typography fontSize={24}>
					<b>STIR/JSHSHIR:</b> {printData?.ReliableJSHR}
				</Typography>
				<Typography fontSize={24}>
					<b>Qabul qilish:</b> "{printData?.hisEnterpriseName}"
				</Typography>
			</Stack>

			<Typography variant="h3" mt={10} textAlign="center">
				Olingan moddiy boyliklar ro'yxati
			</Typography>

			<TableContainer component={Paper} sx={{ maxWidth: 1255, mt: 5 }}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Tartib raqami</TableCell>
							<TableCell align="center">
								Tovar (xizmat) lar Yagona elektron milliy katalog
								<br />
								bo'yicha identifikatsiya kodi va nomi
							</TableCell>
							<TableCell align="center">Mahsulot nomi</TableCell>
							<TableCell align="center">O'lchov birligi</TableCell>
							<TableCell align="center">Miqdori</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{printData?.goods?.map((product: any, index: number) => (
							<TableRow
								key={index}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{index + 1}
								</TableCell>
								<TableCell align="center">{product.productCatalog}</TableCell>
								<TableCell align="center">{product.productName}</TableCell>
								<TableCell align="center">{product.UnitOfMeasure}</TableCell>
								<TableCell align="center">{product.amount}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Typography mt={10} fontSize={20}>
				Qabul qiluvchi imzosi: ______________________________ tasdiqlamoq
			</Typography>
			<Typography fontSize={20}>
				Rahbar: ______________________________ {printData?.myBoss}
			</Typography>
			<Typography fontSize={20}>
				Bosh hisobchi: ______________________________ {printData?.myAccountant}
			</Typography>
		</Stack>
	);
});

export default Document;
