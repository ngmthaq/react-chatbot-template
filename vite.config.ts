import fs from "fs";
import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { config as dotenvConfig } from "dotenv";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "generate-version",
      buildStart() {
        const packageJson = JSON.parse(
          fs.readFileSync("./package.json", "utf-8"),
        );
        const versionData = {
          name: packageJson.name,
          version: packageJson.version,
          buildTime: new Date().toISOString(),
        };
        const outputPath = path.join(__dirname, "public/version.json");
        fs.writeFileSync(outputPath, JSON.stringify(versionData, null, 2));
        console.log(`Generated version.json at ${outputPath}`);
      },
    },
    {
      name: "generate-env",
      buildStart() {
        dotenvConfig({ path: ".env.local", quiet: true });
        const envVars: Record<string, string> = {};
        for (const [key, value] of Object.entries(process.env)) {
          if (key.startsWith("VITE_PUBLIC_") && value) envVars[key] = value;
        }
        const outputPath = path.join(__dirname, "public/env.json");
        fs.writeFileSync(outputPath, JSON.stringify(envVars, null, 2));
        console.log(`Generated env.json at ${outputPath}`);
      },
    },
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      enableRouteTreeFormatting: true,
    }),
    react({
      babel: {
        presets: ["jotai/babel/preset"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
