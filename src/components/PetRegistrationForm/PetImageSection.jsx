import { useState, useEffect } from 'react';
import ImageInput from 'components/Input/ImageInput';
import { TITLES } from './constants';
import PetRegistrationSection from './PetRegistrationSection';
import roundX from '../../assets/roundX.svg';
import { usePetRegistration } from '../../contexts/PetRegistrationContext';
import useCompressImage from 'components/Input/ImageInput/useCompressImage';

function PetImageSection() {
  const [previewUrl, setPreviewUrl] = useState('');

  const { mandatoryData, setMandatoryData } = usePetRegistration();
  const { compressedFile, compressedUrl, isCompressing, compressImage } =
    useCompressImage();

  useEffect(() => {
    if (compressedUrl) {
      setPreviewUrl(compressedUrl);
      setMandatoryData((prevData) => ({
        ...prevData,
        image: {
          id: null,
          url: compressedUrl,
          file: compressedFile,
        },
      }));
    }
  }, [compressedUrl, compressedFile, setMandatoryData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.match('image.*')) {
      compressImage(file); // 이미지 압축 실행
    }
  };

  const handleImageDelete = () => {
    setMandatoryData((prevData) => ({ ...prevData, image: '' }));
    setPreviewUrl('');
  };

  return (
    <PetRegistrationSection title={TITLES.PROFILE_IMAGE}>
      <ImageInput
        imageSrc={previewUrl || mandatoryData.image.url}
        deleteIcon={roundX}
        isLoading={isCompressing}
        onChange={handleImageChange}
        onDelete={handleImageDelete}
      />
    </PetRegistrationSection>
  );
}

export default PetImageSection;
