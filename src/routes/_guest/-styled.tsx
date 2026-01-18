import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const GuestLayoutContainer = styled(Box)(() => ({}));

export const ToolbarContent = styled(Box)(({ theme }) => ({
  gap: theme.spacing(1),
}));

export const LogoSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const MenuSection = styled(Box)(({ theme }) => ({
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
