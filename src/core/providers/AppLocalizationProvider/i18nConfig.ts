import { type InitOptions } from "i18next";
import en from "./lang/en.json";
import vi from "./lang/vi.json";
import "dayjs/locale/en";
import "dayjs/locale/vi";

export type I18nOptions = Required<
  Pick<
    InitOptions,
    "fallbackLng" | "supportedLngs" | "interpolation" | "resources" | "debug"
  >
>;

export const i18nConfig: I18nOptions = {
  fallbackLng: "en",
  supportedLngs: ["en", "vi"],
  interpolation: { escapeValue: false },
  resources: { en, vi },
  debug: import.meta.env.DEV,
};
