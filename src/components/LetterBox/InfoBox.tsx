import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { PetResponse } from 'types/pets';
import { calculateDDay } from 'utils/date';
import TagItem from 'components/LetterBox/TagItem';
import { T } from '../../types/translate';

type Props = {
  pet: PetResponse | null;
};

export default function InfoBox({ pet }: Props) {
  const navigate = useNavigate();
  const { t }: T = useTranslation();

  const onClickProfileUpdateButton = () => {
    navigate('/my-pets/edit', { state: pet?.id });
  };

  const deathAnniversaryDDay =
    pet?.deathAnniversary && calculateDDay(pet?.deathAnniversary);

  return (
    <header className="relative pt-[15.187rem]">
      <div className="rounded-2xl bg-white px-[1.125rem] pb-[1.875rem] pt-6">
        <article className="flex items-center justify-between">
          <div className="flex grow items-center gap-4">
            <span className="text-heading-2 font-bold">{pet?.name}</span>
            <span className="text-solo-large text-orange-400">
              {deathAnniversaryDDay}
            </span>
          </div>
          <button
            className="rounded-[50px] border border-gray-1 px-2 py-[4.5px] text-caption-pc leading-[12px] text-gray-1"
            type="button"
            onClick={onClickProfileUpdateButton}
          >
            {t('letterBox.updateProfile')}
          </button>
        </article>
        <ul className="mt-2.5 flex flex-row gap-1.5">
          {pet?.personalities &&
            pet?.personalities.map((personality, index) => (
              <TagItem
                key={`pets-personality-${personality}`}
                value={personality}
                bgColor={index % 2 === 0 ? 'bg-orange-100' : 'bg-orange-50'}
              />
            ))}
        </ul>
        <p className="mt-4 text-[18px] font-[400]">
          {t('letterBox.description')} {pet?.owner}
        </p>
      </div>
    </header>
  );
}
