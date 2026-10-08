import { addDoc, collection, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from './client';

// Uploaded images live in Firestore, which caps a document at 1 MB, so every upload is
// resized and re-encoded as WebP in the browser until it fits.
const MAX_BASE64_LENGTH = 900_000;

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('This file could not be read as an image.'));
    };
    img.src = url;
  });
}

// Returns a WebP data URL no wider or taller than `maxSide` pixels.
export async function compressImage(file: File, maxSide = 1600): Promise<string> {
  const img = await loadImage(file);
  let side = maxSide;

  for (let attempt = 0; attempt < 6; attempt++) {
    const scale = Math.min(1, side / Math.max(img.naturalWidth || side, img.naturalHeight || side));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round((img.naturalWidth || side) * scale));
    canvas.height = Math.max(1, Math.round((img.naturalHeight || side) * scale));
    canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/webp', 0.82);
    if (dataUrl.length <= MAX_BASE64_LENGTH) return dataUrl;
    side = Math.round(side * 0.75);
  }
  throw new Error('This image is too large even after compression. Try a smaller file.');
}

// Stores a data URL from compressImage() and returns the id the site serves it under (/api/img/<id>).
export async function saveImage(dataUrl: string): Promise<string> {
  const [meta, data] = dataUrl.split(',');
  const type = meta.match(/data:(.*?);/)?.[1] ?? 'image/webp';
  const ref = await addDoc(collection(db, 'images'), { data, type, createdAt: serverTimestamp() });
  return ref.id;
}

export async function removeImage(imageId?: string) {
  if (imageId) await deleteDoc(doc(db, 'images', imageId));
}

// A full-page website screenshot is far taller than one Firestore document can hold, so it
// is scaled to a fixed width and cut into horizontal strips that are stacked again on the site.
export async function sliceTallImage(file: File, width = 1100, stripHeight = 1400): Promise<string[]> {
  const img = await loadImage(file);
  const scale = Math.min(1, width / img.naturalWidth);
  const outWidth = Math.round(img.naturalWidth * scale);
  const outHeight = Math.round(img.naturalHeight * scale);
  if (outHeight / stripHeight > 20) {
    throw new Error('This screenshot is too long. Please use one that is at most about 25 screens tall.');
  }

  const strips: string[] = [];
  for (let y = 0; y < outHeight; y += stripHeight) {
    const height = Math.min(stripHeight, outHeight - y);
    const canvas = document.createElement('canvas');
    canvas.width = outWidth;
    canvas.height = height;
    canvas.getContext('2d')!.drawImage(img, 0, y / scale, img.naturalWidth, height / scale, 0, 0, outWidth, height);

    let quality = 0.82;
    let dataUrl = canvas.toDataURL('image/webp', quality);
    while (dataUrl.length > MAX_BASE64_LENGTH && quality > 0.4) {
      quality -= 0.1;
      dataUrl = canvas.toDataURL('image/webp', quality);
    }
    if (dataUrl.length > MAX_BASE64_LENGTH) throw new Error('This screenshot is too detailed to store. Try a smaller one.');
    strips.push(dataUrl);
  }
  return strips;
}
