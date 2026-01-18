import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  Box,
} from "@mui/material";
import {
  createLazyFileRoute,
  useNavigate,
  useSearch,
  Link,
} from "@tanstack/react-router";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useResetPassword } from "@/core/hooks/useResetPassword";
import {
  ResetPasswordContainer,
  ResetPasswordPaper,
  PasswordStrengthContainer,
  PasswordStrengthBar,
  PasswordStrengthText,
} from "./-styled";

export const Route = createLazyFileRoute("/_guest/password/reset/")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const searchParams = useSearch({ from: "/_guest/password/reset/" });
  const [success, setSuccess] = useState(false);
  const resetPasswordMutation = useResetPassword();

  const token = (searchParams as { token?: string })?.token || "";

  const validationSchema = yup.object({
    password: yup
      .string()
      .min(8, t("resetPassword.validation.passwordMin"))
      .required(t("resetPassword.validation.passwordRequired")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("resetPassword.validation.passwordMatch"))
      .required(t("resetPassword.validation.confirmPasswordRequired")),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await resetPasswordMutation.mutateAsync({
          token,
          newPassword: values.password,
        });
        setSuccess(true);
      } catch (error) {
        console.error("Failed to reset password:", error);
      }
    },
  });

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength += 25;
    if (pwd.length >= 12) strength += 25;
    if (/[A-Z]/.test(pwd)) strength += 25;
    if (/[0-9!@#$%^&*]/.test(pwd)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formik.values.password);

  if (!token) {
    return (
      <Container maxWidth="sm">
        <ResetPasswordContainer>
          <ResetPasswordPaper>
            <Alert severity="error" sx={{ mb: 2 }}>
              {t("resetPassword.invalidToken")}
            </Alert>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate({ to: "/password/forgot" })}
            >
              {t("resetPassword.requestNewLink")}
            </Button>
          </ResetPasswordPaper>
        </ResetPasswordContainer>
      </Container>
    );
  }

  if (success) {
    return (
      <Container maxWidth="sm">
        <ResetPasswordContainer>
          <ResetPasswordPaper>
            <Typography
              variant="h5"
              align="center"
              fontWeight="600"
              sx={{ mb: 2 }}
            >
              ✓ {t("resetPassword.successTitle")}
            </Typography>
            <Alert severity="success" sx={{ mb: 2 }}>
              {t("resetPassword.successMessage")}
            </Alert>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              {t("resetPassword.successInstruction")}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate({ to: "/login" })}
            >
              {t("resetPassword.goToLogin")}
            </Button>
          </ResetPasswordPaper>
        </ResetPasswordContainer>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <ResetPasswordContainer>
        <ResetPasswordPaper>
          <Typography variant="h4" align="center" gutterBottom>
            {t("resetPassword.title")}
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={3}
          >
            {t("resetPassword.subtitle")}
          </Typography>

          <Stack spacing={2} component="form" onSubmit={formik.handleSubmit}>
            <Box>
              <TextField
                name="password"
                type="password"
                label={t("resetPassword.passwordLabel")}
                placeholder={t("resetPassword.passwordPlaceholder")}
                variant="outlined"
                fullWidth
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              {formik.values.password && (
                <PasswordStrengthContainer>
                  <PasswordStrengthBar
                    variant="determinate"
                    value={passwordStrength}
                    color={
                      passwordStrength < 50
                        ? "error"
                        : passwordStrength < 75
                          ? "warning"
                          : "success"
                    }
                  />
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    component={PasswordStrengthText}
                  >
                    {passwordStrength < 50
                      ? t("resetPassword.weakPassword")
                      : passwordStrength < 75
                        ? t("resetPassword.fairPassword")
                        : t("resetPassword.strongPassword")}
                  </Typography>
                </PasswordStrengthContainer>
              )}
            </Box>

            <TextField
              name="confirmPassword"
              type="password"
              label={t("resetPassword.confirmPasswordLabel")}
              placeholder={t("resetPassword.confirmPasswordPlaceholder")}
              variant="outlined"
              fullWidth
              autoComplete="new-password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={
                resetPasswordMutation.isPending ||
                !formik.isValid ||
                !formik.dirty
              }
            >
              {resetPasswordMutation.isPending
                ? t("resetPassword.resetting")
                : t("resetPassword.resetPassword")}
            </Button>

            <Typography variant="body2" align="center">
              <Link to="/login">{t("resetPassword.backToLogin")}</Link>
            </Typography>
          </Stack>
        </ResetPasswordPaper>
      </ResetPasswordContainer>
    </Container>
  );
}
