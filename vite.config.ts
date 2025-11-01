import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load all environment variables based on the current mode (dev/prod)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@lib": path.resolve(__dirname, "./src/lib"),
      },
    },
    server: {
      port: 5173,
      open: true,
    },
    define: {
      // Make environment variables available in the app
      "process.env": {
        ...process.env,
        ...env,
      },
    },
    build: {
      outDir: "dist",
      sourcemap: true, // Helps debugging Netlify builds
    },
  };
});
