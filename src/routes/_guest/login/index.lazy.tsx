import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import { createLazyFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useLogin } from "@/core/hooks/useLogin";

export const Route = createLazyFileRoute("/_guest/login/")({
  component: LoginPage,
});

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(t("login.validation.emailInvalid"))
      .required(t("login.validation.emailRequired")),
    password: yup
      .string()
      .min(6, t("login.validation.passwordMin"))
      .required(t("login.validation.passwordRequired")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await loginMutation.mutateAsync(values);
        if (result.success) {
          navigate({ to: result.navigateTo || "/chat" });
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8 }}>
        <Paper sx={{ p: 4, width: "100%", maxWidth: 450 }}>
          <Typography variant="h4" align="center" gutterBottom>
            {t("login.title")}
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={3}
          >
            {t("login.subtitle")}
          </Typography>

          <Stack spacing={2} component="form" onSubmit={formik.handleSubmit}>
            {/* Social Login */}
            <Button variant="outlined" fullWidth type="button">
              {t("login.continueWithGoogle")}
            </Button>
            <Button variant="outlined" fullWidth type="button">
              {t("login.continueWithGithub")}
            </Button>

            <Divider>{t("login.or")}</Divider>

            {/* Email Field */}
            <TextField
              name="email"
              type="email"
              label={t("login.emailLabel")}
              placeholder={t("login.emailPlaceholder")}
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            {/* Password Field */}
            <TextField
              name="password"
              type="password"
              label={t("login.passwordLabel")}
              placeholder={t("login.passwordPlaceholder")}
              variant="outlined"
              fullWidth
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            {/* Login Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={
                loginMutation.isPending || !formik.isValid || !formik.dirty
              }
            >
              {loginMutation.isPending
                ? t("login.signingIn")
                : t("login.signIn")}
            </Button>

            {/* Sign Up Link */}
            <Typography variant="body2" align="center">
              {t("login.noAccount")}{" "}
              <Link to="/register">{t("login.createAccount")}</Link>
            </Typography>

            {/* Forgot Password Link */}
            <Typography variant="body2" align="center">
              <Link to="/password/forgot">{t("login.forgot")}</Link>
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}
