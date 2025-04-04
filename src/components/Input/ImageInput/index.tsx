import { ChangeEvent, useState } from 'react';

import ImageDeleteButton from 'components/Input/ImageInput/ImageDeleteButton';
import thinPlus from '../../../assets/thinPlus.svg';
import { MoonLoader } from 'react-spinners';

type Props = {
  imageSrc: string;
  deleteIcon: string;
  className?: string;
  isLoading?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
};

function ImageInput({
  className = '',
  imageSrc,
  deleteIcon,
  isLoading = false,
  onChange,
  onDelete,
}: Props) {
  const src = imageSrc || thinPlus;
  const styles = className || '';
  const imgStyles = imageSrc ? 'w-full h-full object-cover' : '';
  const [isHover, setIsHover] = useState(false);

  if (isLoading) {
    return (
      <div
        className={`${styles} flex size-[9.75rem] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#616161] bg-gray-2`}
      >
        <MoonLoader color="#FFB347" size={40} speedMultiplier={0.5} />
      </div>
    );
  }

  return (
    <div
      className="relative inline-block"
      onMouseOver={() => setIsHover(true)}
      onFocus={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onBlur={() => setIsHover(false)}
    >
      <label
        htmlFor="file-upload"
        className={`${styles} flex size-[9.75rem] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#616161] bg-gray-2 text-white`}
      >
        <img className={`${imgStyles} rounded-2xl`} src={src} alt="Uploaded" />
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e)}
      />
      {imageSrc && (
        <ImageDeleteButton
          isHover={isHover}
          icon={deleteIcon}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}

export default ImageInput;
