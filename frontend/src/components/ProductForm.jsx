import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ConfirmDialog from "./ConfirmDialog";

const ProductForm = ({ defaultValues, onFormSubmit, isEditMode = false }) => {
  const navigate = useNavigate();
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: defaultValues,
  });

  const handleCancelClick = () => {
    setOpenCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    setOpenCancelDialog(false);
    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom align="right">
        {isEditMode ? "עריכת מוצר" : "הוספת מוצר חדש"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
        noValidate
        sx={{ mt: 2 }}
      >
        <TextField
          label="שם המוצר"
          fullWidth
          margin="normal"
          {...register("name", {
            required: "שדה חובה",
            maxLength: { value: 50, message: "מקסימום 50 תווים" },
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label='מק"ט'
          type="number"
          fullWidth
          margin="normal"
          {...register("sku", {
            required: "שדה חובה",
            min: { value: 0, message: "חייב להיות מספר חיובי" },
          })}
          error={!!errors.sku}
          helperText={errors.sku?.message}
        />

        <Controller
          name="category"
          control={control}
          defaultValue=""
          rules={{ required: "יש לבחור קטגוריה" }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="קטגוריה"
              fullWidth
              margin="normal"
              error={!!errors.category}
              helperText={errors.category?.message}
              slotProps={{ inputLabel: { shrink: true } }}
            >
              <MenuItem value="ירק">ירק</MenuItem>
              <MenuItem value="פרי">פרי</MenuItem>
              <MenuItem value="גידולי שדה">גידולי שדה</MenuItem>
            </TextField>
          )}
        />

        <TextField
          label="תיאור המוצר"
          multiline
          rows={3}
          fullWidth
          margin="normal"
          {...register("description")}
        />

        <TextField
          label="תאריך שיווק"
          type="date"
          fullWidth
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("marketingDate")}
        />

        <Box
          sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}
        >
          <Button
            variant="outlined"
            color="error"
            startIcon={<CancelIcon />}
            onClick={handleCancelClick}
          >
            ביטול
          </Button>

          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            // אם אנחנו בעריכה וגם "לא מלוכלך" (לא היה שינוי) -> הכפתור כבוי
            disabled={isEditMode && !isDirty}
          >
            {isEditMode ? "עדכן מוצר" : "שמור מוצר"}
          </Button>
        </Box>
      </Box>

      <ConfirmDialog
        open={openCancelDialog}
        onClose={() => setOpenCancelDialog(false)}
        onConfirm={handleConfirmCancel}
        title="יציאה ללא שמירה"
        content="האם אתה בטוח שברצונך לצאת? השינויים לא יישמרו."
      />
    </Paper>
  );
};

export default ProductForm;
