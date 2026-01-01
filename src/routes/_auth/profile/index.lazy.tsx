import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Container,
  Paper,
  Button,
  Typography,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Route = createLazyFileRoute("/_auth/profile/")({
  component: ProfilePage,
});

function ProfilePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "AI enthusiast and chatbot developer",
    joinDate: "January 2024",
  });

  const [editForm, setEditForm] = useState(profile);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = () => {
    setProfile(editForm);
  };

  const handleOpenPasswordDialog = () => {
    setOpenPasswordDialog(true);
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleSavePassword = () => {
    // TODO: Implement password change logic
    console.log("Password changed:", passwordForm);
    handleClosePasswordDialog();
  };

  const handleBackToChat = () => {
    navigate({ to: "/chat" });
  };

  return (
    <Box>
      <Box sx={{ marginTop: 2 }}>
        <Container maxWidth="sm" sx={{ py: 4 }}>
          {/* Profile Header Card */}
          <Paper elevation={2} sx={{ borderRadius: 1.5, p: 4, mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <IconButton
                onClick={handleBackToChat}
                size="small"
                title="Back to chat"
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" fontWeight="600">
                {t("profile.title")}
              </Typography>
              <Box sx={{ width: 40 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                  sx={{ mb: 0.5 }}
                >
                  {t("profile.fullName")}
                </Typography>
                <TextField
                  fullWidth
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  variant="outlined"
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                  sx={{ mb: 0.5 }}
                >
                  {t("profile.email")}
                </Typography>
                <TextField
                  fullWidth
                  value={editForm.email}
                  disabled
                  variant="outlined"
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  display="block"
                  sx={{ mb: 0.5 }}
                >
                  {t("profile.bio")}
                </Typography>
                <TextField
                  fullWidth
                  value={editForm.bio}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bio: e.target.value })
                  }
                  variant="outlined"
                  multiline
                  rows={3}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained" onClick={handleSave}>
                  {t("profile.save")}
                </Button>
                <Button variant="outlined" onClick={handleOpenPasswordDialog}>
                  {t("profile.changePassword")}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Change Password Dialog */}
      <Dialog
        open={openPasswordDialog}
        onClose={handleClosePasswordDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{t("profile.changePassword")}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            fullWidth
            type="password"
            label={t("profile.currentPassword")}
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                currentPassword: e.target.value,
              })
            }
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            type="password"
            label={t("profile.newPassword")}
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, newPassword: e.target.value })
            }
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            type="password"
            label={t("profile.confirmPassword")}
            value={passwordForm.confirmPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                confirmPassword: e.target.value,
              })
            }
            variant="outlined"
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePasswordDialog} variant="outlined">
            {t("profile.cancel")}
          </Button>
          <Button onClick={handleSavePassword} variant="contained">
            {t("profile.save")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
