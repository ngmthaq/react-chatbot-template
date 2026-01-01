import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LanguageIcon from "@mui/icons-material/Language";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useColorScheme,
} from "@mui/material";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import logo from "../../assets/img/vite.svg";

export const Route = createFileRoute("/_guest")({
  component: GuestLayout,
});

function GuestLayout() {
  const { mode, setMode } = useColorScheme();
  const { i18n } = useTranslation();

  const handleThemeToggle = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const handleLanguageToggle = () => {
    const newLang = i18n.language === "en" ? "vi" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="img"
              src={logo}
              alt="App logo"
              sx={{ height: 32 }}
            />
          </Box>
          <Box
            sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}
          >
            <IconButton
              onClick={handleThemeToggle}
              color="inherit"
              title={
                mode === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
            <IconButton
              onClick={handleLanguageToggle}
              color="inherit"
              title={
                i18n.language === "en"
                  ? "Switch to Vietnamese"
                  : "Switch to English"
              }
            >
              <LanguageIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
