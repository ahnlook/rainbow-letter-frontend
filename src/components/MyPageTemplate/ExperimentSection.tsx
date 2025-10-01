import { useState, useEffect } from 'react';
import {
  getPetInitiatedLetterEnabledList,
  updatePetInitiatedLetterEnabled,
  addPetInitiatedLetterEnabled,
  deletePetInitiatedLetterEnabled,
} from 'api/user';
import Flask from '../../assets/ic_myPage_flask.svg';
import { toast } from 'react-toastify';
import BottomSheet from 'components/Common/BottomSheet';
import BottomSheetContents from 'components/LetterBox/SelectPets';
import { PetResponse } from 'types/pets';
import { getPets } from 'api/pets';
import XIcon from '../../assets/iconRight.svg';
import PlusIcon from '../../assets/myPage_plus.svg';
import { format } from 'date-fns';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { modalActions } from 'store/modal/modal-slice';

type EnabledPet = { petId: number; petName: string };

type Props = {
  isOn: boolean;
};

export default function ExperimentSection({ isOn }: Props) {
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState<boolean>(isOn);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [allPets, setAllPets] = useState<PetResponse[]>([]);
  const [petsList, setPetsList] = useState<EnabledPet[]>([]);
  const [petsListBeforeOpen, setPetsListBeforeOpen] = useState<EnabledPet[]>(
    []
  );
  const [isPetAdded, setIsPetAdded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (isEnabled) {
        const { data: enabledList } = await getPetInitiatedLetterEnabledList();
        setPetsList(enabledList || []);
      } else {
        setPetsList([]);
      }
    })();
  }, [isEnabled]);

  useEffect(() => {
    setIsEnabled(isOn);
  }, [isOn]);

  const handleBottomSheetVisibility = (state: boolean) => {
    if (state) {
      // 바텀시트가 열릴 때 현재 상태를 저장
      setPetsListBeforeOpen([...petsList]);
      setIsPetAdded(false);
    } else {
      // 바텀시트가 닫힐 때 아이가 추가되지 않았다면 자동으로 off
      if (
        isEnabled &&
        petsList.length === petsListBeforeOpen.length &&
        !isPetAdded
      ) {
        setIsEnabled(false);
        updatePetInitiatedLetterEnabled(false);
        const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm');
        alert(`${formattedDate} OFF 하였습니다.`);
      }
    }

    setIsShow(state);
  };

  const toggleSwitch = async () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const startTime = 19 * 60;
    const endTime = 20 * 60;

    if (currentTime >= startTime && currentTime < endTime) {
      return dispatch(modalActions.openModal('EXPERIMENT_DATE'));
    }

    const newValue = !isEnabled;

    if (newValue) {
      try {
        await updatePetInitiatedLetterEnabled(true);
        const { data: enabledList } = await getPetInitiatedLetterEnabledList();
        setIsEnabled(true);
        setPetsList(enabledList || []);
        if (!enabledList || enabledList.length === 0) {
          const { data } = await getPets();
          setAllPets(data.pets || []);
          setIsShow(true);
        } else {
          setIsShow(false);
        }
      } catch (error) {
        setIsEnabled(false);
        toast.error('설정 변경에 실패했습니다.');
      }
    }

    if (!newValue) {
      try {
        setIsEnabled(false);
        await updatePetInitiatedLetterEnabled(false);
      } catch (error) {
        setIsEnabled(true);
        toast.error('설정 변경에 실패했습니다.');
      }
    }

    const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm');
    const message = newValue
      ? `${formattedDate} ON 하였습니다.`
      : `${formattedDate} OFF 하였습니다.`;
    alert(message);
  };

  const handlePetSelect = async (pet: PetResponse) => {
    try {
      if (petsList.some((p) => p.petId === pet.id)) {
        alert('이미 등록된 아이입니다.');
        return;
      }
      await addPetInitiatedLetterEnabled(pet.id);
      setIsPetAdded(true);

      const { data: enabledList } = await getPetInitiatedLetterEnabledList();
      setPetsList(enabledList || []);
      handleBottomSheetVisibility(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
    }
  };

  const onClickAddPet = async () => {
    try {
      setIsShow(true);
      const { data } = await getPets();
      setAllPets(data.pets || []);
    } catch (e) {
      toast.error('펫 목록을 불러오지 못했습니다.');
    }
  };

  const handleDeletePet = async (petId: number) => {
    try {
      await deletePetInitiatedLetterEnabled(petId);
      const { data: enabledList } = await getPetInitiatedLetterEnabledList();
      if (enabledList && enabledList.length > 0) {
        setPetsList(enabledList);
      } else {
        setIsEnabled(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <section className="px-2.5 pt-7">
        <div className="flex items-center gap-1">
          <img src={Flask} alt="flask" />
          <h3 className="text-heading-3">실험실</h3>
        </div>
        <div className="mt-7 flex items-center justify-between">
          <p className="text-lg font-bold">아이에게 먼저 편지 받기</p>
          <button
            onClick={toggleSwitch}
            className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
              isEnabled ? 'bg-[#424242]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`${
                isEnabled ? 'translate-x-5' : 'translate-x-1'
              } inline-block size-4 rounded-full bg-white transition duration-200 ease-in-out`}
            />
          </button>
        </div>
        <p className="mt-2 text-sm text-[#616161]">
          월, 수, 금 저녁 8시 아이가 먼저 편지를 보내요
        </p>
        {isEnabled && (
          <div className="mt-4 flex flex-wrap gap-2.5">
            {petsList.map((pet) => (
              <div
                key={`pre-pet-list-${pet.petId}`}
                className="flex items-center gap-1 rounded-[999px] bg-[#717680]/10 px-3 py-1.5"
              >
                <p className="text-[#4B515B]">{pet.petName}</p>
                <img
                  src={XIcon}
                  alt="x"
                  className="size-4 cursor-pointer"
                  onClick={() => handleDeletePet(pet.petId)}
                />
              </div>
            ))}
            {petsList.length > 0 && (
              <div
                className="flex cursor-pointer items-center gap-1 rounded-[999px] border border-[#BDBDBD] bg-white px-3 py-1.5"
                onClick={onClickAddPet}
              >
                <p className="text-[#4B515B]">추가하기</p>
                <img src={PlusIcon} alt="plus" className="size-2" />
              </div>
            )}
          </div>
        )}
      </section>

      <BottomSheet
        handlePetsListShow={handleBottomSheetVisibility}
        isShow={isShow}
        contents={
          <BottomSheetContents
            list={allPets}
            onChange={handlePetSelect}
            handlePetsListShow={handleBottomSheetVisibility}
          />
        }
      />
    </>
  );
}
