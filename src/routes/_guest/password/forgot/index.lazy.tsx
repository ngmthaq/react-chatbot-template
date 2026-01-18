import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
} from "@mui/material";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useForgotPassword } from "@/core/hooks/useForgotPassword";
import {
  ForgotPasswordContainer,
  ForgotPasswordPaper,
  TryAnotherButton,
} from "./-styled";

export const Route = createLazyFileRoute("/_guest/password/forgot/")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const forgotPasswordMutation = useForgotPassword();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(t("forgotPassword.validation.emailInvalid"))
      .required(t("forgotPassword.validation.emailRequired")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await forgotPasswordMutation.mutateAsync(values.email);
        setSubmitted(true);
      } catch (error) {
        console.error("Failed to send reset email:", error);
      }
    },
  });

  if (submitted) {
    return (
      <Container maxWidth="sm">
        <ForgotPasswordContainer>
          <ForgotPasswordPaper>
            <Typography variant="h4" align="center" gutterBottom>
              {t("forgotPassword.checkEmail")}
            </Typography>
            <Alert severity="success" sx={{ mb: 2 }}>
              {t("forgotPassword.sentMessage")}
            </Alert>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              {t("forgotPassword.instruction")}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {t("forgotPassword.notReceived")}{" "}
              <TryAnotherButton
                size="small"
                onClick={() => {
                  setSubmitted(false);
                  formik.resetForm();
                }}
              >
                {t("forgotPassword.tryAnother")}
              </TryAnotherButton>
            </Typography>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              <Link to="/login">{t("forgotPassword.backToLogin")}</Link>
            </Typography>
          </ForgotPasswordPaper>
        </ForgotPasswordContainer>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <ForgotPasswordContainer>
        <ForgotPasswordPaper>
          <Typography variant="h4" align="center" gutterBottom>
            {t("forgotPassword.title")}
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={3}
          >
            {t("forgotPassword.subtitle")}
          </Typography>

          <Stack spacing={2} component="form" onSubmit={formik.handleSubmit}>
            <TextField
              name="email"
              type="email"
              label={t("forgotPassword.emailLabel")}
              placeholder={t("forgotPassword.emailPlaceholder")}
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={
                forgotPasswordMutation.isPending ||
                !formik.isValid ||
                !formik.dirty
              }
            >
              {forgotPasswordMutation.isPending
                ? t("forgotPassword.sending")
                : t("forgotPassword.sendResetLink")}
            </Button>

            <Typography variant="body2" align="center">
              <Link to="/login">{t("forgotPassword.backToLogin")}</Link>
            </Typography>
          </Stack>
        </ForgotPasswordPaper>
      </ForgotPasswordContainer>
    </Container>
  );
}
