import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { getProxies } from "../services/proxy";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";

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

				<Box>
					{!proxies.length && (
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
