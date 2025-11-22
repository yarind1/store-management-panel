import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/api";
import { Container } from "@mui/material";
import ProductForm from "../components/ProductForm";
import { useToast } from "../context/toastContext";

const AddProductPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [defaultDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date.toISOString().split("T")[0];
  });

  const handleFormSubmit = async (data) => {
    try {
      await addProduct(data);
      showToast("המוצר נוסף בהצלחה!", "success");
      navigate("/");
    } catch (error) {
      console.error("Error adding product:", error);
      showToast(
        "שגיאה בשמירת המוצר: " +
          (error.response?.data?.message || error.message),
        "error"
      );
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <ProductForm
        onFormSubmit={handleFormSubmit}
        defaultValues={{ marketingDate: defaultDate }}
        isEditMode={false}
      />
    </Container>
  );
};

export default AddProductPage;
