// Hero portrait: apply the current photo to the page (and admin preview).
import { state } from '../../core/state.js';
import { showToast } from '../../core/state.js';

export function applyPhoto() {
  const img = document.getElementById('portrait');
  if (img) img.src = state.PHOTO;
  const pv = document.getElementById('photoPreview');
  if (pv) pv.src = state.PHOTO;
}

// Resize + center-crop an uploaded image to a square JPEG data URL.
export function processPhotoFile(file, cb) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const im = new Image();
    im.onload = () => {
      const size = Math.min(im.width, im.height);
      const sx = (im.width - size) / 2;
      const sy = (im.height - size) / 2;
      const out = 760;
      const c = document.createElement('canvas');
      c.width = out; c.height = out;
      const ctx = c.getContext('2d');
      ctx.drawImage(im, sx, sy, size, size, 0, 0, out, out);
      cb(c.toDataURL('image/jpeg', 0.88));
    };
    im.onerror = () => showToast('Could not read image');
    im.src = e.target.result;
  };
  reader.onerror = () => showToast('Could not read file');
  reader.readAsDataURL(file);
}
