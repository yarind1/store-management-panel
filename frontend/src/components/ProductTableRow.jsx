import { TableRow, TableCell, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const ProductTableRow = ({ product, onDelete }) => {
  const navigate = useNavigate();

  // פורמט תאריך (מטפל במקרה שאין תאריך)
  const formattedDate = product.marketingDate
    ? new Date(product.marketingDate).toLocaleDateString("he-IL")
    : "-";

  return (
    <TableRow hover>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.sku}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell align="center">
        <IconButton
          color="primary"
          onClick={() => navigate(`/edit/${product._id}`)}
          title="ערוך מוצר"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => onDelete(product._id)}
          title="מחק מוצר"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
