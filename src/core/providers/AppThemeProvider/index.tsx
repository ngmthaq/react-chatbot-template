import type { FC, PropsWithChildren } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const AppThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme} noSsr disableTransitionOnChange>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
