import fs from 'node:fs';
import path from 'node:path';

// Client logos stored as image files in /public/clients. The file name becomes the label,
// so "al-noor-trading.png" is labelled "al noor trading".
export function readLocalLogos() {
  const dir = path.join(process.cwd(), 'public', 'clients');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => /\.(png|jpe?g|webp|svg|avif)$/i.test(file))
    .sort()
    .map((file) => ({
      src: `/clients/${encodeURIComponent(file)}`,
      name: file.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
    }));
}
