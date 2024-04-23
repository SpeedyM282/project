import { PropsWithChildren, useState } from "react";
import { IconButton, Menu, Stack } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

const CustomMenu = ({ children }: PropsWithChildren) => {
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
				{children}
			</Menu>
		</>
	);
};

export default CustomMenu;
