import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { PetResponse } from 'types/pets';
import Plus from '../../assets/ic_letterBox_plus.svg';

type Props = {
  list: PetResponse[];
  onChange: (pet: PetResponse) => void;
  handlePetsListShow: (state: boolean) => void;
};

export default function SelectPetSheet({
  list,
  onChange,
  handlePetsListShow,
}: Props) {
  const { t } = useTranslation<'translation'>();
  const navigate = useNavigate();

  const onClickAddPet = useCallback(() => {
    navigate('/my-pets/register');
  }, []);

  const handleChangePet = useCallback((pet: PetResponse) => {
    handlePetsListShow(false);
    onChange(pet);
  }, []);

  return (
    <article className="flex w-full flex-col items-center justify-between">
      <div className="w-full">
        <p className="py-[13px] text-center text-[18px] font-[500]">
          {t('letterBox.select')}
        </p>
        <ul className="h-[140px] w-full overflow-y-auto text-[18px] font-[400] leading-[18px]">
          {list.map((pet) => (
            <li
              className="border-b px-[18px] py-3"
              key={`bottomSheet-petName-${pet.id}`}
            >
              <button
                type="button"
                onClick={() => handleChangePet(pet)}
                className="block w-full text-left"
              >
                {pet.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={onClickAddPet}
        className="absolute bottom-5 flex items-center gap-1.5 rounded-[8px] border border-orange-400 px-5 py-2.5"
      >
        <img src={Plus} alt="추가하기 아이콘" />
        <span className="leading-[16px] text-orange-400">
          {t('letterBox.add')}
        </span>
      </button>
    </article>
  );
}
