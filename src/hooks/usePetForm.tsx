import { useLocation } from 'react-router-dom';

import { registerPet, updatePet } from 'api/pets';
import { resisterImage } from 'api/images';
import { generateFormData } from 'utils/formData';
import { isFutureDate } from 'utils/date';
import { Dates } from 'types/date';
import { PetRegister } from 'types/pets';
import { isActualDate } from 'utils/validators';
import useCompressImage from 'components/Input/ImageInput/useCompressImage';

const usePetForm = (
  initialData: PetRegister,
  onSuccess: () => void,
  onError: (error: Error) => void,
  id: string
) => {
  const { pathname } = useLocation();
  const isEdit = pathname.includes('edit');
  const { compressImage } = useCompressImage();

  const isDataComplete = (data: PetRegister) => {
    if (!data) return null;
    const isNameFilled = !!data.name;
    const isSpeciesFilled = !!data.species;
    const isOwnerFilled = !!data.owner;
    const isDeathAnniversaryFilled =
      data.deathAnniversary === null ||
      (data.deathAnniversary?.year !== '' &&
        data.deathAnniversary?.month !== '' &&
        data.deathAnniversary?.day !== '' &&
        isActualDate(
          data.deathAnniversary.year,
          data.deathAnniversary.month,
          data.deathAnniversary.day
        ) &&
        !isFutureDate(data.deathAnniversary));
    const isImageUrlFilled = !!(data.image && data.image.url);
    const isImageFileFilled = !!(
      data.image &&
      (data.image.file || data.image.id)
    );

    if (isEdit) {
      return (
        isNameFilled &&
        isSpeciesFilled &&
        isOwnerFilled &&
        isDeathAnniversaryFilled
      );
    }

    return (
      isNameFilled &&
      isSpeciesFilled &&
      isOwnerFilled &&
      isDeathAnniversaryFilled &&
      isImageUrlFilled &&
      isImageFileFilled
    );
  };

  const isAllMandatoryDataFilled = isDataComplete(initialData);

  const formatDeathAnniversary = ({ year, month, day }: Dates<string>) => {
    if (year === '' || month === '' || day === '') {
      return null;
    }

    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const uploadImage = async (image: string | File) => {
    const imageFormData = generateFormData(image);
    const { data } = await resisterImage(imageFormData, 'profile');

    return data.objectKey;
  };

  const handleSubmit = async (
    mandatoryData: PetRegister,
    optionalData: PetRegister
  ) => {
    const { image } = mandatoryData;
    let imageId;

    try {
      if (image.id) {
        imageId = image.id;
      } else if (image.file) {
        const compressedFile = await compressImage(image.file);
        if (compressedFile) {
          imageId = await uploadImage(compressedFile);
        }
      }

      const formattedDeathAnniversary =
        mandatoryData.deathAnniversary &&
        formatDeathAnniversary(mandatoryData.deathAnniversary);

      const dataToSubmit = {
        ...mandatoryData,
        ...optionalData,
        image: imageId,
        deathAnniversary: formattedDeathAnniversary,
      };

      if (isEdit) {
        await updatePet(dataToSubmit, id);
      } else {
        await registerPet(dataToSubmit);
      }
      onSuccess?.();
    } catch (error) {
      if (error instanceof Error) {
        onError?.(error);
      }
    }
  };

  return { isAllMandatoryDataFilled, handleSubmit };
};

export default usePetForm;
