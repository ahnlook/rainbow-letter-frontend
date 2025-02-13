import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { USER_ACTIONS } from 'components/Write/constants';
import { PetResponse } from 'types/pets';
import useDetectClose from 'hooks/useDetectClose';
import dropDownImg from '../../assets/ion_chevron-back.svg';
import dropUpImg from '../../assets/ion_chevron-up.svg';
import plusImg from '../../assets/ic_round-plus-black.svg';

type Props = {
  petName: string | null;
  petsList: PetResponse[];
  onclick: (pet: PetResponse) => void;
};

export default function PetsListDropDown({
  petName,
  petsList,
  onclick,
}: Props) {
  const { t } = useTranslation<'translation'>();
  const dropdown = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useDetectClose(dropdown, false);

  const imgSrc = isOpen ? dropUpImg : dropDownImg;

  useEffect(() => {
    setIsOpen(false);
  }, [petName]);

  return (
    <section ref={dropdown} className="text-solo-medium">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-2xl border border-orange-400 bg-orange-50 px-6 py-[1.125rem]"
      >
        <p>{petName}</p>
        <img src={imgSrc} alt="dropdown" />
      </button>
      <div className="relative">
        {isOpen && (
          <ul className="absolute z-10 mt-1.5 w-full rounded-2xl border border-orange-400 bg-white">
            {petsList.map((pet) => (
              <li
                key={pet.id}
                onClick={() => onclick(pet)}
                className="cursor-pointer border-b border-[#EFEFEF] py-4 pl-6 last:border-none"
              >
                {pet.name}
              </li>
            ))}
            <Link
              to="/my-pets/register"
              className="flex items-center py-3 pl-3"
            >
              <img src={plusImg} alt={plusImg} />
              <p>{t(USER_ACTIONS.ADD)}</p>
            </Link>
          </ul>
        )}
      </div>
    </section>
  );
}
