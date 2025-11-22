import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../services/api";
import { Container, CircularProgress } from "@mui/material";
import ProductForm from "../components/ProductForm";
import { useToast } from "../context/toastContext";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const product = await getProductById(id);

        if (product.marketingDate) {
          product.marketingDate = new Date(product.marketingDate)
            .toISOString()
            .split("T")[0];
        }

        setProductData(product);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        showToast("שגיאה בטעינת המוצר", "error");
        navigate("/");
      }
    };

    fetchProductData();
  }, [id, navigate, showToast]);

  const handleFormSubmit = async (data) => {
    try {
      await updateProduct(id, data);
      showToast("המוצר עודכן בהצלחה!", "success");
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
      showToast(
        "שגיאה בעדכון המוצר: " +
          (error.response?.data?.message || error.message),
        "error"
      );
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <ProductForm
        onFormSubmit={handleFormSubmit}
        defaultValues={productData}
        isEditMode={true}
      />
    </Container>
  );
};

export default EditProductPage;
