import { IProduct } from "./CreateProxy";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import {
	Box,
	Paper,
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
	IconButton,
	TableContainer,
	TextField,
} from "@mui/material";
import { productsArray, units } from "./helper";

interface IProps {
	products: IProduct[];
	setProducts: (product: any) => void;
}

const CreateProxyTable = ({ products, setProducts }: IProps) => {
	const handleProductChange = (
		event: any,
		key: keyof IProduct,
		index: number
	) => {
		setProducts((prev: IProduct[]) =>
			prev.map((e, i) =>
				i === index ? { ...e, [key]: event.target.value } : e
			)
		);
	};

	const handleAddProduct = () => {
		setProducts((prev: IProduct[]) => [
			...prev,
			{
				productCatalog: "",
				productName: "",
				UnitOfMeasure: "",
				amount: 0,
			},
		]);
	};

	const handleDeleteProduct = (index: number) => {
		setProducts((prev: IProduct[]) => prev.filter((_, i) => i !== index));
	};

	return (
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
			<TableContainer component={Paper} sx={{ maxWidth: 1255 }}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow
							sx={{
								bgcolor: "#d3d3d3",
							}}
						>
							<TableCell>№</TableCell>
							<TableCell align="center">
								Tovar (xizmat) lar
								<br />
								Yagona elektron milliy katalog
								<br />
								bo'yicha identifikatsiya kodi va nomi
							</TableCell>
							<TableCell align="center">Tovar (xizmat) lar nomi</TableCell>
							<TableCell align="center">O'lchov birligi</TableCell>
							<TableCell align="center">Miqdori</TableCell>
							<TableCell align="center"></TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{products.map((product, index) => (
							<TableRow
								key={index}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{index + 1}
								</TableCell>
								<TableCell align="center">
									<FormControl fullWidth>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={product.productCatalog}
											onChange={(e) =>
												handleProductChange(e, "productCatalog", index)
											}
										>
											{productsArray.map((e) => (
												<MenuItem key={e} value={e}>
													{e}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</TableCell>
								<TableCell align="center">
									<TextField
										value={product.productName}
										onChange={(e) =>
											handleProductChange(e, "productName", index)
										}
									/>
								</TableCell>
								<TableCell align="center">
									<FormControl fullWidth>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={product.UnitOfMeasure}
											onChange={(e) =>
												handleProductChange(e, "UnitOfMeasure", index)
											}
										>
											{units.map((e) => (
												<MenuItem key={e} value={e}>
													{e}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</TableCell>
								<TableCell align="center">
									<TextField
										type="number"
										value={product.amount}
										onChange={(e) => handleProductChange(e, "amount", index)}
									/>
								</TableCell>
								<TableCell align="center">
									{products.length > 1 && (
										<IconButton
											color="error"
											onClick={() => handleDeleteProduct(index)}
										>
											<RemoveCircleOutlineRoundedIcon />
										</IconButton>
									)}
									<IconButton color="success" onClick={handleAddProduct}>
										<AddCircleOutlineRoundedIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default CreateProxyTable;
