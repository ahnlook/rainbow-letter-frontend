import { useState } from 'react';
import imageCompression, { Options } from 'browser-image-compression';

const useCompressImage = () => {
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [compressedUrl, setCompressedUrl] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);

  const compressImage = async (file: File): Promise<File | null> => {
    const options: Options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
      fileType: 'image/webp',
      initialQuality: 0.5,
    };

    try {
      setIsCompressing(true);
      const compressed = await imageCompression(file, options);

      if (compressed.size > file.size) {
        return file;
      }

      setCompressedFile(compressed);
      const previewUrl = URL.createObjectURL(compressed);
      setCompressedUrl(previewUrl);
      return compressed;
    } catch (error) {
      console.error('이미지 압축 실패:', error);
      return null;
    } finally {
      setIsCompressing(false);
    }
  };

  return {
    compressedFile,
    compressedUrl,
    isCompressing,
    compressImage,
  };
};

export default useCompressImage;
