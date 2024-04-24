import { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import CustomMenu from "../../components/CustomMenu";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProxy, getProxies } from "../../services/proxy";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import {
	Box,
	Button,
	MenuItem,
	Modal,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import Document from "./Document";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

const Dashboard = () => {
	const navigate = useNavigate();
	const handleOpen = () => setOpen(true);
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	const [proxies, setProxies] = useState([]);
	const [printData, setPrintData] = useState<any>();
	const [page, setPage] = useState(0);
	const [proxiesCount, setProxiesCount] = useState(0);

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setPage(0);
	};

	const componentRef = useRef();

	const handlePrint = useReactToPrint({
		content: (): any => componentRef.current,
	});

	useEffect(() => {
		getProxies(page + 1).then((res: any) => {
			console.log(res.data);
			setProxiesCount(res.data?.proxyCount);
			setProxies(res.data?.data);
		});
	}, [page]);

	const handleLogout = () => {
		localStorage.setItem("token", "");
		localStorage.setItem("inn", "");
		navigate("/login");
	};

	const handleDeleteProxy = (id: string) => {
		deleteProxy(id).then(() =>
			setProxies((prev) => prev.filter((e: any) => e._id !== id))
		);
	};

	return (
		<>
			<Stack display="none">
				<Document printData={printData} ref={componentRef} />
			</Stack>

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
											sx={{
												"&:last-child td, &:last-child th": { border: 0 },
											}}
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
												<CustomMenu>
													<MenuItem
														sx={{
															display: "flex",
															gap: 1,
															color: "#2196f3",
														}}
														onClick={async () => {
															await setPrintData(proxy);
															handlePrint();
														}}
													>
														<LocalPrintshopIcon color="primary" /> Chop etish
													</MenuItem>
													<MenuItem
														sx={{
															display: "flex",
															gap: 1,
															color: "#ba000d",
														}}
														onClick={() => handleDeleteProxy(proxy._id)}
													>
														<DeleteIcon color="error" /> O'chirish
													</MenuItem>
												</CustomMenu>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter
									sx={{
										width: "100%",
										height: "56px",
										position: "relative",
									}}
								>
									<TableRow
										sx={{
											position: "absolute",
											right: 10,
										}}
									>
										<TablePagination
											colSpan={3}
											page={page}
											count={proxiesCount}
											rowsPerPageOptions={[]}
											rowsPerPage={proxies.length}
											onPageChange={handleChangePage}
											ActionsComponent={TablePaginationActions}
										/>
									</TableRow>
								</TableFooter>
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
