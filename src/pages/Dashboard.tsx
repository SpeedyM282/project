import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { getProxies } from "../services/proxy";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	const navigate = useNavigate();
	useEffect(() => {
		getProxies().then((res) => console.log("RES", res));
	}, []);

	return (
		<Stack p={5}>
			<Stack direction="row" justifyContent="space-between" gap={5}>
				<Typography variant="h4">Xujjatlar</Typography>

				<Button variant="contained" onClick={() => navigate("/proxy-create")}>
					<AddIcon />
					Ishonchnoma
				</Button>
			</Stack>

			<Box></Box>
		</Stack>
	);
};

export default Dashboard;
