import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { ColorModeProvider } from "./context/ColorModeContext";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import { ToastProvider } from "./context/ToastProvider";

function App() {
  return (
    <ColorModeProvider>
      <ToastProvider>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />

          <Box sx={{ p: 2 }}>
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/add" element={<AddProductPage />} />
              <Route path="/edit/:id" element={<EditProductPage />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </ToastProvider>
    </ColorModeProvider>
  );
}

export default App;
