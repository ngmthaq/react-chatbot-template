import {
  Container,
  TextField,
  Button,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
  Stack,
  Alert,
} from "@mui/material";
import { createLazyFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useRegister } from "@/core/hooks/useRegister";
import { RegisterContainer, RegisterPaper } from "./-styled";

export const Route = createLazyFileRoute("/_guest/register/")({
  component: RegisterPage,
});

function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(2, t("register.validation.nameMin"))
      .required(t("register.validation.nameRequired")),
    email: yup
      .string()
      .email(t("register.validation.emailInvalid"))
      .required(t("register.validation.emailRequired")),
    password: yup
      .string()
      .min(6, t("register.validation.passwordMin"))
      .required(t("register.validation.passwordRequired")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("register.validation.passwordMatch"))
      .required(t("register.validation.confirmPasswordRequired")),
    agreeTerms: yup
      .boolean()
      .oneOf([true], t("register.validation.termsRequired"))
      .required(t("register.validation.termsRequired")),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await registerMutation.mutateAsync({
          name: values.name,
          email: values.email,
          password: values.password,
        });
        if (result.success) {
          navigate({ to: result.navigateTo || "/chat" });
        }
      } catch (error) {
        console.error("Registration failed:", error);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <RegisterContainer>
        <RegisterPaper>
          <Typography variant="h4" align="center" gutterBottom>
            {t("register.title")}
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={3}
          >
            {t("register.subtitle")}
          </Typography>

          <Stack spacing={2} component="form" onSubmit={formik.handleSubmit}>
            {/* Social Login */}
            <Button variant="outlined" fullWidth type="button">
              {t("register.signUpWithGoogle")}
            </Button>
            <Button variant="outlined" fullWidth type="button">
              {t("register.signUpWithGithub")}
            </Button>

            <Divider>{t("register.or")}</Divider>

            {/* Full Name Field */}
            <TextField
              name="name"
              label={t("register.nameLabel")}
              placeholder={t("register.namePlaceholder")}
              variant="outlined"
              fullWidth
              autoComplete="off"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            {/* Email Field */}
            <TextField
              name="email"
              type="email"
              label={t("register.emailLabel")}
              placeholder={t("register.emailPlaceholder")}
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
              label={t("register.passwordLabel")}
              placeholder={t("register.passwordPlaceholder")}
              variant="outlined"
              fullWidth
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            {/* Confirm Password Field */}
            <TextField
              name="confirmPassword"
              type="password"
              label={t("register.confirmPasswordLabel")}
              placeholder={t("register.confirmPasswordPlaceholder")}
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

            {/* Terms Agreement */}
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeTerms"
                  checked={formik.values.agreeTerms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              }
              label={
                <Typography variant="body2">
                  {t("register.agreeTerms")}
                </Typography>
              }
            />
            {formik.touched.agreeTerms && formik.errors.agreeTerms && (
              <Alert severity="error">{formik.errors.agreeTerms}</Alert>
            )}

            {/* Register Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={
                registerMutation.isPending || !formik.isValid || !formik.dirty
              }
            >
              {registerMutation.isPending
                ? t("register.creatingAccount")
                : t("register.createAccount")}
            </Button>

            {/* Login Link */}
            <Typography variant="body2" align="center">
              {t("register.haveAccount")}{" "}
              <Link to="/login">{t("register.signIn")}</Link>
            </Typography>
          </Stack>
        </RegisterPaper>
      </RegisterContainer>
    </Container>
  );
}
