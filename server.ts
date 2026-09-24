import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import fs from 'fs';
// @ts-ignore
import backendApp from './backend/server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Endpoint to download the entire project as a clean ZIP archive
  app.get('/api/download-zip', (req, res) => {
    const zipPath = '/tmp/career-coach-ai.zip';
    const pyScript = `
import os, zipfile
project_dir = '/app/applet'
exclude_dirs = {'node_modules', 'dist', '.git', '.cache'}
with zipfile.ZipFile('${zipPath}', 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(project_dir):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, project_dir)
            zipf.write(full_path, rel_path)
`;
    exec(`python3 -c "${pyScript.replace(/"/g, '\\"')}"`, (err) => {
      if (err) {
        console.error('Failed to create zip', err);
        // Fallback to sending existing if present
        if (fs.existsSync(zipPath)) {
          return res.download(zipPath, 'career-coach-ai-project.zip');
        }
        return res.status(500).json({ error: 'Failed to create zip archive' });
      }
      res.download(zipPath, 'career-coach-ai-project.zip');
    });
  });

  // Mount backend API router and services
  app.use(backendApp);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Mount Vite dev server middlewares
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Career Coach AI applet running on http://localhost:${PORT}`);
    console.log(`📡 Backend REST APIs live at http://localhost:${PORT}/api`);
  });
}

startServer();
