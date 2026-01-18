import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LoginContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
}));

export const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "100%",
  maxWidth: 450,
}));
