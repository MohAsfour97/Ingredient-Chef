import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Use the correct path to the Vite build
  const distPath = path.resolve(__dirname, "../dist"); // <-- updated

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}. Make sure to run 'npm run build' first.`,
    );
  }

  // Serve static files from the dist folder
  app.use(express.static(distPath));

  // SPA fallback: serve index.html for all unknown routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}
