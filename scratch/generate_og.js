import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgPath = path.join(__dirname, 'og-image.svg');
const outPath = path.join(__dirname, '..', 'public', 'og-image.png');

sharp(svgPath)
  .png()
  .toFile(outPath)
  .then(info => {
    console.log('Successfully generated og-image.png', info);
  })
  .catch(err => {
    console.error('Error generating image', err);
  });
