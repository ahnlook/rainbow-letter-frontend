import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

import { PetsDashBoard } from 'types/pets';
import { calculateDDay } from 'utils/date';
import letter from 'assets/letter.svg';
import arrow from 'assets/ion_chevron-back-home.svg';
import { formatImageType } from 'utils/image';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type Props = {
  pet: PetsDashBoard | undefined;
  letterCount: number | undefined;
};

export default function PetInfo({ pet, letterCount }: Props) {
  const navigate = useNavigate();
  const { lng } = useSelector((state: RootState) => state.common);
  const deathAnniversaryDDay =
    pet?.deathAnniversary && calculateDDay(pet?.deathAnniversary);

  const handleScroll = () => {
    navigate('/letter-box', { state: pet?.id });
  };

  const sentLetterValue = useMemo(() => {
    if (lng === 'ko') {
      return `보낸 편지 ${letterCount}회`;
    }

    return `Letters Sent ${letterCount}`;
  }, [lng, letterCount]);

  return (
    <article
      onClick={handleScroll}
      className="relative flex cursor-pointer flex-row items-center rounded-2xl border px-5 py-6"
    >
      <img
        src={formatImageType(pet?.image)}
        alt="pet"
        className="mr-7 size-[5.5rem] rounded-full object-cover"
      />
      <div className="flex flex-col justify-center gap-x-2">
        <div className="mb-2 flex items-center gap-2">
          <h5 className="font-bold text-orange-400">{pet && pet.name}</h5>
          <span className="text-caption leading-none text-gray-2">
            {deathAnniversaryDDay}
          </span>
        </div>
        <div className="flex flex-col gap-y-2.5 text-solo-small text-gray-1">
          <div className="flex gap-2.5">
            <img src={letter} alt="letter" />
            <p>{sentLetterValue}</p>
          </div>
        </div>
        <img
          src={arrow}
          alt="arrow"
          className="absolute right-1 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </article>
  );
}
