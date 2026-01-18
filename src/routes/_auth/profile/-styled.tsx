import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ProfilePageContainer = styled(Box)(() => ({}));

export const ProfileContentWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export const ProfilePaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

export const ProfileHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

export const ProfileHeaderSpacer = styled(Box)(() => ({
  width: 40,
}));

export const ProfileFormContainer = styled(Box)(() => ({
  flex: 1,
}));

export const ProfileFormField = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const ProfileFormLabel = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
}));

export const ProfileActionsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
}));

export const PasswordDialogContent = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));
