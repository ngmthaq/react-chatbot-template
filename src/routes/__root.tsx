import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import {
  AppLocalizationProvider,
  AppQueryProvider,
  AppThemeProvider,
} from "../core/providers";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AppLocalizationProvider>
      <AppQueryProvider>
        <AppThemeProvider>
          <Outlet />
          <TanStackRouterDevtools position="bottom-right" />
        </AppThemeProvider>
      </AppQueryProvider>
    </AppLocalizationProvider>
  );
}
