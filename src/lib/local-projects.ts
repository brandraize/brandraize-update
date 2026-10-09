import fs from 'node:fs';
import path from 'node:path';

// Pictures of the built-in projects, stored as image files in /public/projects. The file name
// is the project's id, so "roaya.png" is the picture of the project with the id "roaya".
export function readProjectImages() {
  const dir = path.join(process.cwd(), 'public', 'projects');
  if (!fs.existsSync(dir)) return new Map<string, string>();

  return new Map(
    fs
      .readdirSync(dir)
      .filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file))
      .sort()
      .map((file) => [file.replace(/\.[^.]+$/, '').toLowerCase(), `/projects/${encodeURIComponent(file)}`]),
  );
}
