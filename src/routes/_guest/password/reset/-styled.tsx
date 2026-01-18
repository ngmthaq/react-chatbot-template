import { Box, Paper, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ResetPasswordContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
}));

export const ResetPasswordPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: "100%",
  maxWidth: 450,
}));

export const PasswordStrengthContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

export const PasswordStrengthBar = styled(LinearProgress)(() => ({
  height: 8,
  borderRadius: 4,
}));

export const PasswordStrengthText = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  display: "block",
}));
