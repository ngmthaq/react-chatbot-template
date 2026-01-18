import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useColorScheme,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import React from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/img/vite.svg";

export const Route = createFileRoute("/_guest")({
  component: GuestLayout,
});

function GuestLayout() {
  const { mode, setMode } = useColorScheme();
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleThemeToggle = () => {
    setMode(mode === "light" ? "dark" : "light");
    handleMenuClose();
  };

  const handleLanguageToggle = () => {
    const newLang = i18n.language === "en" ? "vi" : "en";
    i18n.changeLanguage(newLang);
    handleMenuClose();
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              component="img"
              src={logo}
              alt="App logo"
              sx={{ height: 32 }}
            />
            <Typography variant="h6" component="div">
              {window.__ENV__?.VITE_PUBLIC_APP_NAME || ""}
            </Typography>
          </Box>
          <Box
            sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}
          >
            <IconButton onClick={handleMenuOpen} color="inherit" title="Menu">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleThemeToggle}>
                <ListItemIcon>
                  {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
                </ListItemIcon>
                <ListItemText>
                  {mode === "light"
                    ? t("menu.switchToDarkMode")
                    : t("menu.switchToLightMode")}
                </ListItemText>
              </MenuItem>
              <MenuItem onClick={handleLanguageToggle}>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText>
                  {i18n.language === "en"
                    ? t("menu.switchToVietnamese")
                    : t("menu.switchToEnglish")}
                </ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
