import { Box, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ForgotPasswordContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
}));

export const ForgotPasswordPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "100%",
  maxWidth: 450,
}));

export const TryAnotherButton = styled(Button)(() => ({
  textTransform: "none",
}));
