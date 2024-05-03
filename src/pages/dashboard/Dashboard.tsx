import Document from "./Document";
import CustomMenu from "./CustomMenu";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { deleteProxy, getProxies, searchProxy } from "../../services/proxy";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import {
	Box,
	Modal,
	Paper,
	Stack,
	Table,
	Button,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
	TextField,
	Typography,
	TableFooter,
	TableContainer,
	TablePagination,
} from "@mui/material";

const Dashboard = () => {
	const navigate = useNavigate();
	const [page, setPage] = useState(0);
	const handleOpen = () => setOpen(true);
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	const [proxies, setProxies] = useState([]);
	const [printData, setPrintData] = useState<any>();
	const [proxiesCount, setProxiesCount] = useState(0);
	const [filterDates, setFilterDates] = useState<{
		dateHead: string;
		dateEnd: string;
	}>({
		dateHead: "",
		dateEnd: "",
	});

	const handleChangePage = (
		_: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const componentRef = useRef();

	const handlePrint = useReactToPrint({
		content: (): any => componentRef.current,
	});

	const getProxiesPerPage = () => {
		getProxies(page + 1).then((res: any) => {
			if (res) {
				setProxiesCount(res.data?.proxyCount);
				setProxies(res.data?.data);
			}
		});
	};

	useEffect(() => {
		getProxiesPerPage();
	}, [page]);

	const handleLogout = () => {
		sessionStorage.setItem("token", "");
		sessionStorage.setItem("inn", "");
		navigate("/login");
	};

	const handleDeleteProxy = (id: string) => {
		deleteProxy(id).then(() => {
			setPage(0);
			getProxiesPerPage();
		});
	};

	const handleFilter = () => {
		searchProxy(filterDates).then((res) => {
			if (res?.data) {
				setProxiesCount(res.data?.proxyCount || res.data?.data?.length);
				setProxies(res.data?.data);
			}
		});
	};

	const handleResetFilter = () => {
		getProxiesPerPage();
		setFilterDates({ dateEnd: "", dateHead: "" });
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

				<Stack mt={5} direction="row" gap={3}>
					<TextField
						type="date"
						label="*dan"
						sx={{ width: 200 }}
						value={filterDates.dateHead}
						InputLabelProps={{ shrink: true }}
						onChange={(e) =>
							setFilterDates((prev) => ({ ...prev, dateHead: e.target.value }))
						}
					/>
					<TextField
						type="date"
						label="*gacha"
						sx={{ width: 200 }}
						value={filterDates.dateEnd}
						InputLabelProps={{ shrink: true }}
						onChange={(e) =>
							setFilterDates((prev) => ({ ...prev, dateEnd: e.target.value }))
						}
					/>
					<Button
						variant="outlined"
						onClick={handleFilter}
						disabled={!filterDates.dateEnd || !filterDates.dateHead}
					>
						Filtrlash
					</Button>
					<Button
						color="warning"
						variant="outlined"
						onClick={handleResetFilter}
						disabled={!filterDates.dateEnd || !filterDates.dateHead}
					>
						Qaytarish
					</Button>
				</Stack>

				<Box my={5}>
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
												{new Date(proxy.dateHead).getMonth() + 1}/
												{new Date(proxy.dateHead).getFullYear()}
											</TableCell>
											<TableCell align="center">
												{new Date(proxy.dateEnd).getDate()}/
												{new Date(proxy.dateEnd).getMonth() + 1}/
												{new Date(proxy.dateEnd).getFullYear()}
											</TableCell>
											<TableCell align="center">
												{proxy.agreementNumber}
											</TableCell>
											<TableCell align="center">
												{new Date(proxy.dateAgreement).getDate()}/
												{new Date(proxy.dateAgreement).getMonth() + 1}/
												{new Date(proxy.dateAgreement).getFullYear()}
											</TableCell>
											<TableCell align="center">
												<CustomMenu
													onPrintClick={async () => {
														await setPrintData(proxy);
														handlePrint();
													}}
													onDeleteClick={() => handleDeleteProxy(proxy._id)}
												/>
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
											page={page}
											count={proxiesCount}
											rowsPerPageOptions={[5]}
											rowsPerPage={5}
											onPageChange={handleChangePage}
											ActionsComponent={TablePaginationActions}
											sx={{
												border: "none",
											}}
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
