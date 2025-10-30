
import { ImageFile } from '../types';

export const fileToImageFile = (file: File): Promise<ImageFile> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        const dataUrl = event.target.result;
        const base64 = dataUrl.split(',')[1];
        resolve({
          name: file.name,
          type: file.type,
          size: file.size,
          base64: base64,
          dataUrl: dataUrl,
        });
      } else {
        reject(new Error('Failed to read file.'));
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};
