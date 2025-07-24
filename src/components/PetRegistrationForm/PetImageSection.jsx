import { useState } from 'react';
import ImageInput from 'components/Input/ImageInput';
import { TITLES } from './constants';
import PetRegistrationSection from './PetRegistrationSection';
import roundX from '../../assets/roundX.svg';
import { usePetRegistration } from '../../contexts/PetRegistrationContext';
import { toast } from 'react-toastify';

function PetImageSection() {
  const [previewUrl, setPreviewUrl] = useState('');

  const { mandatoryData, setMandatoryData } = usePetRegistration();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('이 사진은 업로드할 수 없어요!');
        e.target.value = '';
        return;
      }
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
