import { useState } from 'react';
import imageCompression, { Options } from 'browser-image-compression';

const useCompressImage = () => {
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [compressedUrl, setCompressedUrl] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);

  const compressImage = async (file: File) => {
    const options: Options = {
      maxSizeMB: 10,
      useWebWorker: true,
      fileType: 'image/webp',
    };

    try {
      setIsCompressing(true);
      const compressed = await imageCompression(file, options);
      setCompressedFile(compressed);
      const previewUrl = URL.createObjectURL(compressed);
      setCompressedUrl(previewUrl);
    } catch (error) {
      console.error('이미지 압축 실패:', error);
    } finally {
      setIsCompressing(false);
    }
  };

  return { compressedFile, compressedUrl, isCompressing, compressImage };
};

export default useCompressImage;
