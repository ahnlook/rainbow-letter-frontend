import { ChangeEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { INFO_MESSAGES } from 'components/Write/constants';
import ImageInput from 'components/Input/ImageInput';
import roundX from '../../assets/roundX.svg';

type Props = {
  setImageFile: (file: File | string) => void;
  setOriginalFile: (file: File | null) => void;
};

function ImageUploadSection({ setImageFile, setOriginalFile }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const { t } = useTranslation<'translation'>();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      if (file && file.type.match('image.*')) {
        const previewUrl = URL.createObjectURL(file);
        setPreviewUrl(previewUrl);
        setOriginalFile(file);
        setImageFile('');
        e.target.value = '';
      }
    }
  };

  const handleImageDelete = () => {
    setPreviewUrl('');
    setImageFile('');
    setOriginalFile(null);
  };

  return (
    <section className="mt-10">
      <h4 className="text-solo-large">
        {t(INFO_MESSAGES.SUGGEST_SEND_PHOTO)}
        <span className="text-gray-2">{t(INFO_MESSAGES.OPTION)}</span>
      </h4>
      <p className="mb-[1.625rem mt-[0.813rem] text-caption text-gray-2">
        {t(INFO_MESSAGES.POSSIBLE_NUMBER)}
      </p>
      <ImageInput
        imageSrc={previewUrl}
        deleteIcon={roundX}
        onChange={handleImageChange}
        onDelete={handleImageDelete}
      />
    </section>
  );
}

export default ImageUploadSection;
