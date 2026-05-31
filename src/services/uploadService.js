import { supabase } from '../lib/supabaseClient';

// Helper to determine if we are in a mock session
const isMockSession = () => localStorage.getItem('karta_mock_session') === 'true';

/**
 * Compress an image file using HTML5 Canvas to keep file sizes small & premium.
 * Scales down image to maximum width and recompresses to JPEG.
 */
export function compressImage(file, maxWidth = 800, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Scale proportionally if width exceeds limit
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Canvas blob generation failed'));
            }
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

/**
 * Uploads an activity cover image to Supabase Storage with compression.
 * Falls back cleanly to compressed Base64 string if client is offline or bucket is not configured.
 */
export async function uploadActivityImage(file) {
  // Compress the image client-side first
  let compressedBlob;
  try {
    compressedBlob = await compressImage(file);
  } catch (err) {
    console.warn('[Storage] Compression failed, using original file:', err);
    compressedBlob = file; // Fallback to original file on failure
  }

  // If mock mode or Supabase is not ready, return Base64 string
  if (!supabase || isMockSession()) {
    console.log('[Storage] Mock mode active. Resolving image to Base64.');
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressedBlob);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  }

  try {
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.jpg`;

    // Upload to 'activities' bucket
    const { data, error } = await supabase.storage
      .from('activities')
      .upload(fileName, compressedBlob, {
        contentType: 'image/jpeg',
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.warn('[Storage] Upload to Supabase bucket failed. Falling back to Base64:', error.message);
      // Fallback to Base64 if bucket does not exist or has RLS/permission errors
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(compressedBlob);
        reader.onloadend = () => resolve(reader.result);
      });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('activities')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.warn('[Storage] Unexpected error, falling back to Base64:', error.message);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(compressedBlob);
      reader.onloadend = () => resolve(reader.result);
    });
  }
}
