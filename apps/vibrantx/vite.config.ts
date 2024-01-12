import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import Sitemap from "vite-plugin-sitemap";
const names = [
  "/?product=Staking",
  "/tokenpage",
  "/portfolio",
  "/?product=Lending",
];
const dynamicRoutes = names.map((name) => `${name}`);
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: "",
      },
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  plugins: [
    react(),
    Sitemap({ dynamicRoutes, hostname: "https://vibrantx.finance/" }),
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
  define: {
    "process.env": process.env,
    __APP_ENV__: JSON.stringify(process.env.APP_ENV),
  },
});
