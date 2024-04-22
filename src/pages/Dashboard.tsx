import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { deleteProxy, getProxies } from "../services/proxy";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import {
	Box,
	Button,
	IconButton,
	Modal,
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
import DeleteIcon from "@mui/icons-material/Delete";

const Dashboard = () => {
	const navigate = useNavigate();
	const handleOpen = () => setOpen(true);
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	const [proxies, setProxies] = useState([]);

	useEffect(() => {
		getProxies()
			.then((res) => setProxies(res.data?.data))
			.catch(() => alert("Xatolik yuz berdi\nIltimos keyinroq urunib ko'ring"));
	}, []);

	const handleLogout = () => {
		localStorage.setItem("token", "");
		localStorage.setItem("inn", "");
		navigate("/login");
	};

	const handleDeleteProxy = (id: string) => {
		deleteProxy(id).then((res) =>
			setProxies((prev) => prev.filter((e: any) => e._id !== id))
		);
	};

	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Stack
					direction="column"
					gap={3}
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 550,
						bgcolor: "background.paper",
						borderRadius: 2,
						p: 4,
					}}
				>
					<Typography textAlign="center" variant="h4">
						Siz rostdan ham chiqmoqchimisiz?
					</Typography>

					<Stack direction="row" gap={3} justifyContent="center">
						<Button variant="contained" onClick={handleClose}>
							Bekor qilish
						</Button>
						<Button variant="contained" color="error" onClick={handleLogout}>
							Chiqish
						</Button>
					</Stack>
				</Stack>
			</Modal>

			<Stack p={5}>
				<Stack direction="row" justifyContent="space-between" gap={5}>
					<Typography variant="h4">Xujjatlar</Typography>

					<Stack direction="row" gap={5}>
						<Button
							variant="contained"
							onClick={() => navigate("/proxy-create")}
						>
							<AddIcon />
							Ishonchnoma
						</Button>

						<Button variant="contained" color="error" onClick={handleOpen}>
							Chiqish
							<LogoutIcon />
						</Button>
					</Stack>
				</Stack>

				<Box m={"50px 0"}>
					{proxies.length ? (
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow
										sx={{
											bgcolor: "#d3d3d3",
										}}
									>
										<TableCell>№</TableCell>
										<TableCell align="center">Ishonchnoma raqami</TableCell>
										<TableCell align="center">Berilgan sana</TableCell>
										<TableCell align="center">Amal qilish muddati</TableCell>
										<TableCell align="center">Shartnoma raqami</TableCell>
										<TableCell align="center">Shartnoma sanasi</TableCell>
										<TableCell align="center"></TableCell>
									</TableRow>
								</TableHead>

								<TableBody>
									{proxies.map((proxy: any, index) => (
										<TableRow
											key={index}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{index + 1}
											</TableCell>
											<TableCell align="center">{proxy.proxyNumber}</TableCell>
											<TableCell align="center">
												{new Date(proxy.dateHead).getDate()}/
												{new Date(proxy.dateHead).getMonth()}/
												{new Date(proxy.dateHead).getFullYear()}
											</TableCell>
											<TableCell align="center">
												{new Date(proxy.dateEnd).getDate()}/
												{new Date(proxy.dateEnd).getMonth()}/
												{new Date(proxy.dateEnd).getFullYear()}
											</TableCell>
											<TableCell align="center">
												{proxy.agreementNumber}
											</TableCell>
											<TableCell align="center">
												{new Date(proxy.dateAgreement).getDate()}/
												{new Date(proxy.dateAgreement).getMonth()}/
												{new Date(proxy.dateAgreement).getFullYear()}
											</TableCell>
											<TableCell align="center">
												<IconButton
													color="error"
													onClick={() => handleDeleteProxy(proxy._id)}
												>
													<DeleteIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					) : (
						<Typography m="100px auto" textAlign="center" variant="h4">
							Hali xujjatlar yo'q
						</Typography>
					)}
				</Box>
			</Stack>
		</>
	);
};

export default Dashboard;
