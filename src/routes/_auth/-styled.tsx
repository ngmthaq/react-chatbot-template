import { Box, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LayoutContainer = styled(Box)(() => ({}));

export const ToolbarContent = styled(Box)(({ theme }) => ({
  gap: theme.spacing(1),
}));

export const LogoSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const LogoImage = styled(Box)(() => ({
  height: 32,
}));

export const UserSection = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const UserInfoContainer = styled(Box)(({ theme }) => ({
  flexDirection: "column",
  alignItems: "flex-end",
  marginRight: theme.spacing(1),
  display: "none",

  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

export const UserEmail = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const LogoutMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export const LogoutIcon = styled(Box)(({ theme }) => ({
  color: theme.palette.error.main,
}));
