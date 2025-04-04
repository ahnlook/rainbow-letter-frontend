import { useState } from 'react';
import ImageInput from 'components/Input/ImageInput';
import { TITLES } from './constants';
import PetRegistrationSection from './PetRegistrationSection';
import roundX from '../../assets/roundX.svg';
import { usePetRegistration } from '../../contexts/PetRegistrationContext';

function PetImageSection() {
  const [previewUrl, setPreviewUrl] = useState('');

  const { mandatoryData, setMandatoryData } = usePetRegistration();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.match('image.*')) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
      setMandatoryData((prevData) => ({
        ...prevData,
        image: {
          id: null,
          url: previewUrl,
          file: file,
        },
      }));
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
        onChange={handleImageChange}
        onDelete={handleImageDelete}
      />
    </PetRegistrationSection>
  );
}

export default PetImageSection;
