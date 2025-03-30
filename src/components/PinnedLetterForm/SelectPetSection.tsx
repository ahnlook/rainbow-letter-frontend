import { useState, useEffect } from 'react';
import Arrow from '../../assets/ic_toggle_arrow.svg';
import BottomSheet from 'components/Common/BottomSheet';
import { getPets } from 'api/pets';
import { PetResponse } from 'types/pets';
import BottomSheetContents from 'components/LetterBox/SelectPets';
import SelectPetSheet from './SelectPetSheet';

type Props = {
  setSelectedPet: (pet: PetResponse | null) => void;
  selectedPet: PetResponse | null;
  petsList: PetResponse[];
};

export default function SelectPetSection({
  setSelectedPet,
  selectedPet,
  petsList,
}: Props) {
  const [isShow, setIsShow] = useState<boolean>(false);

  const handlePetsListShow = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <>
      <section className="mt-[38px] flex flex-col gap-4">
        <p className="font-bold">아이 이름</p>
        <div
          onClick={handlePetsListShow}
          className="flex min-h-[50px] cursor-pointer items-center justify-between rounded-lg bg-[#F8F8F8] p-4"
        >
          <p className="leading-[18px]">{selectedPet?.name}</p>
          <img src={Arrow} alt="arrow" loading="lazy" />
        </div>
      </section>
      <BottomSheet
        handlePetsListShow={handlePetsListShow}
        isShow={isShow}
        contents={
          <SelectPetSheet
            list={petsList}
            onChange={setSelectedPet}
            handlePetsListShow={handlePetsListShow}
          />
        }
      />
    </>
  );
}
