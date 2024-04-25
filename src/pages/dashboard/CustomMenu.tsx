import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Menu, MenuItem } from "@mui/material";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

interface IProps {
	onPrintClick: () => void;
	onDeleteClick: () => void;
}

const CustomMenu = ({ onDeleteClick, onPrintClick }: IProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton onClick={handleClick}>
				<MoreVertRoundedIcon />
			</IconButton>

			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<MenuItem
					sx={{
						display: "flex",
						gap: 1,
						color: "#2196f3",
					}}
					onClick={() => {
						onPrintClick();
						handleClose();
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
					onClick={() => {
						onDeleteClick();
						handleClose();
					}}
				>
					<DeleteIcon color="error" /> O'chirish
				</MenuItem>
			</Menu>
		</>
	);
};

export default CustomMenu;
