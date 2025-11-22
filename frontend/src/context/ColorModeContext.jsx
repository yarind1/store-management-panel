import { useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { ColorModeContext } from "./themeContext";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

// יצירת Cache שטוען את הפלאגין של ה-RTL
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        direction: "rtl", // הגדרת כיוון הטקסט ל-RTL
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#f4f6f8", paper: "#ffffff" },
              }
            : {
                background: { default: "#121212", paper: "#1e1e1e" },
              }),
        },
        typography: {
          fontFamily: "Rubik, Arial, sans-serif",
        },
        components: {
          MuiTableCell: {
            styleOverrides: {
              head: {
                fontWeight: "bold",
                backgroundColor: mode === "light" ? "#f5f5f5" : "#333",
                color: mode === "light" ? "#000" : "#fff",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      {/* CacheProvider עוטף את הכל ודואג להיפוך ה-CSS */}
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </CacheProvider>
    </ColorModeContext.Provider>
  );
};
