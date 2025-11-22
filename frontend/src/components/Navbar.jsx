import { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useTheme } from "@mui/material/styles";
import { useColorMode } from "../context/themeContext";
import ConfirmDialog from "./ConfirmDialog";

const Navbar = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const location = useLocation();

  const [openDialog, setOpenDialog] = useState(false);

  const handleHomeClick = () => {
    const isFormPage =
      location.pathname.includes("/add") || location.pathname.includes("/edit");

    if (isFormPage) {
      setOpenDialog(true);
    } else {
      navigate("/");
    }
  };

  const handleConfirmExit = () => {
    setOpenDialog(false);
    navigate("/");
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              cursor: "pointer",
            }}
            onClick={handleHomeClick}
          >
            <StorefrontIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div">
              החנות שלי
            </Typography>
          </Box>

          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      <ConfirmDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirmExit}
        title="יציאה ללא שמירה"
        content="האם אתה בטוח שברצונך לצאת? השינויים שביצעת לא יישמרו."
      />
    </>
  );
};

export default Navbar;
