import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
  TextField,
  InputAdornment,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useNavigate } from "react-router-dom";
import ProductTableRow from "../components/ProductTableRow";
import { useToast } from "../context/toastContext";
import ConfirmDialog from "../components/ConfirmDialog";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();
  const { showToast } = useToast();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        showToast("שגיאה בטעינת הנתונים", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [showToast]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteProduct(deleteId);
      setProducts((prevProducts) =>
        prevProducts.filter((prod) => prod._id !== deleteId)
      );
      showToast("המוצר נמחק בהצלחה", "success");
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast("שגיאה במחיקת המוצר", "error");
    } finally {
      setOpenDeleteDialog(false);
      setDeleteId(null);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        ניהול מוצרים{" "}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/add")}
          sx={{ flexShrink: 0 }}
        >
          הוסף מוצר
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <FormControl
          sx={{ minWidth: 150, bgcolor: "background.paper" }}
          size="small"
        >
          <InputLabel id="category-select-label">סינון קטגוריה</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategory}
            label="סינון קטגוריה"
            onChange={(e) => setSelectedCategory(e.target.value)}
            startAdornment={
              <FilterListIcon sx={{ mr: 1, color: "action.active" }} />
            }
          >
            <MenuItem value="">
              <em>הצג הכל</em>
            </MenuItem>
            <MenuItem value="ירק">ירק</MenuItem>
            <MenuItem value="פרי">פרי</MenuItem>
            <MenuItem value="גידולי שדה">גידולי שדה</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="חפש לפי שם מוצר..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: "250px", bgcolor: "background.paper" }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ maxHeight: "70vh", overflow: "auto" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>שם המוצר</strong>
              </TableCell>
              <TableCell>
                <strong>מק"ט</strong>
              </TableCell>
              <TableCell>
                <strong>קטגוריה</strong>
              </TableCell>
              <TableCell>
                <strong>תאריך שיווק</strong>
              </TableCell>
              <TableCell align="center">
                <strong>פעולות</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* טיפול במצבי טעינה */}
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                  <CircularProgress />
                  <Typography
                    variant="body2"
                    sx={{ mt: 2, color: "text.secondary" }}
                  >
                    טוען נתונים...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="textSecondary">
                    {searchQuery || selectedCategory
                      ? "לא נמצאו מוצרים תואמים לסינון."
                      : "אין מוצרים להצגה. התחל להוסיף!"}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <ProductTableRow
                  key={product._id}
                  product={product}
                  onDelete={handleDeleteClick}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="מחיקת מוצר"
        content="האם אתה בטוח שברצונך למחוק?"
      />
    </Container>
  );
};

export default ProductsPage;
