import fs from 'fs';
import path from 'path';

const photoFilePath = 'src/data/photo.js';
const publicDir = 'public';
const destFilePath = path.join(publicDir, 'portrait-default.jpg');

async function run() {
  try {
    console.log('Reading src/data/photo.js...');
    const content = fs.readFileSync(photoFilePath, 'utf-8');
    
    // Find the base64 part
    const match = content.match(/data:image\/jpeg;base64,([A-Za-z0-9+/=\s\r\n]+)/);
    if (!match) {
      console.error('Could not find base64 image data in photo.js');
      return;
    }
    
    // Clean up whitespace/newline characters from base64 string
    const base64Data = match[1].replace(/[\s\r\n']/g, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Ensure public folder exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir);
      console.log('Created public/ directory');
    }
    
    fs.writeFileSync(destFilePath, buffer);
    console.log(`Saved default photo to ${destFilePath} (${buffer.length} bytes)`);
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
