import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import ResisterButtonSection from 'components/Write/ResisterButtonSection';
import PetsListDropDown from 'components/Write/PetsListDropDown';
import TopicSuggestion from 'components/Write/TopicSuggestion';
import ImageUploadSection from 'components/Write/ImageUploadSection';
import WritableLetterPaper from 'components/Write/WritableLetterPaper';
import LetterPaperWithImage from 'components/Write/LetterPaperWithImage';
import Button from 'components/Button';
import { sendLetter } from 'api/letter';
import { getUserInfo } from 'api/user';
import { getPets } from 'api/pets';
import { resisterImage } from 'api/images';
import {
  isExistCheckSavedLetter,
  getSavedLetter,
  generateSavedLetter,
  updateSavedLetter,
  updateSessionID,
  deleteSavedLetter,
} from 'api/temporaries';
import { PetResponse } from 'types/pets';
import { generateFormData } from 'utils/formData';
import { getExpireModal } from 'utils/localStorage';
import {
  setSessionAutoSaveID,
  getSessionAutoSaveID,
} from 'utils/sessionStorage';
import { modalActions } from 'store/modal/modal-slice';
import { letterActions } from 'store/letter/letter-slice';
import CoverImage from 'components/Common/CoverImage';
import { LetterRequest } from 'types/letters';
import { formatImageType } from 'utils/image';
import Spinner from 'components/Spinner';
import { T } from 'types/translate';
import { RootState } from 'store';
import Modal from 'components/Modal';
import ReplyInfoModalForEn from 'components/Write/ReplyInfoModalForEn';

export default function WriteLetter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t }: T = useTranslation();
  const { lng } = useSelector((state: RootState) => state.common);
  const [petsList, setPetsList] = useState<PetResponse[]>([]);
  const [selectedPet, setSelectedPet] = useState<PetResponse | null>(null);
  const [imageFile, setImageFile] = useState<File | string>('');
  const [letter, setLetter] = useState<LetterRequest>({
    summary: '',
    content: '',
    image: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [temp, setTemp] = useState<string | undefined>('');
  const [savedLetterId, setSavedLetterId] = useState<number | null>(null);
  const [isFetchLoading, setIsFetchLoading] = useState(true);
  const [isEnModalOpen, setEnModalOpen] = useState<boolean>(false);

  // 편지쓰기 페이지 입장
  useEffect(() => {
    (async () => {
      setIsFetchLoading(true);
      const { data } = await getPets();
      setPetsList(data.pets || []);
      dispatch(
        letterActions.setIsExistPet(data.pets.length > 0 ? true : false)
      );
      if (location.state) {
        const finedPet = data.pets.find(
          (pet: PetResponse) => pet.id === location.state
        );
        setIsFetchLoading(false);
        return setSelectedPet(finedPet || data.pets[0]);
      }
      setIsFetchLoading(false);
      setSelectedPet(data.pets[0] || null);

      return () => {
        dispatch(modalActions.closeModal());
      };
    })();
  }, []);

  useEffect(() => {
    const isCheckExistedLetter = async (id: number | undefined) => {
      const {
        data: { exists },
      } = await isExistCheckSavedLetter(id);

      if (exists) {
        return whenExistedSavedLetter();
      }

      return whenNonExistedSavedLetter();
    };

    if (selectedPet?.id) {
      isCheckExistedLetter(selectedPet?.id);
    }
  }, [selectedPet?.id]);

  // 자동저장 편지가 없을 때
  const whenNonExistedSavedLetter = useCallback(async () => {
    const newSaveLetterData = {
      petId: selectedPet?.id,
      content: letter?.content,
    };

    const { sessionId, id } = await generateSavedLetter(newSaveLetterData);
    setSessionAutoSaveID(sessionId);
    setSavedLetterId(id);
    dispatch(letterActions.setIsSuccess());
  }, [selectedPet?.id, letter.content]);

  // 자동저장 편지가 있을 때(편지 생성 및 세션 아이디 초기화)
  const whenExistedSavedLetter = useCallback(async () => {
    const { data } = await getSavedLetter(selectedPet?.id);
    setLetter({
      ...letter,
      content: data.content,
      summary: data.content.slice(0, 20),
    });
    setSavedLetterId(data.id);

    const {
      data: { sessionId },
    } = await updateSessionID(data.id);

    setSessionAutoSaveID(sessionId);
    dispatch(letterActions.setIsSuccess());
  }, [selectedPet?.id]);

  // 편지 내용 상태 관리
  useEffect(() => {
    setTemp(letter?.content);
    dispatch(letterActions.setIsSaving(true));
  }, [letter?.content]);

  // 편지 서버에 저장
  useEffect(() => {
    const saveLetterValue = async () => {
      try {
        const {
          data: { exists },
        } = await isExistCheckSavedLetter(selectedPet?.id);
        if (exists && temp !== '' && savedLetterId) {
          const newData = {
            petId: selectedPet?.id,
            content: letter?.content,
          };
          await updateSavedLetter(savedLetterId, newData);
          dispatch(letterActions.setIsSuccess());
        }
      } catch (error) {
        dispatch(letterActions.setisFailed());
      }
    };

    const autoSaveLetter = setTimeout(() => {
      if (temp === letter?.content) {
        dispatch(letterActions.setIsSaving(false));
        saveLetterValue();
      }

      clearTimeout(autoSaveLetter);
    }, 3000);

    return () => clearTimeout(autoSaveLetter);
  }, [temp, selectedPet?.id, savedLetterId]);

  // 다른 탭에서 접속했는지 확인.
  useEffect(() => {
    const compareSessionId = async () => {
      try {
        const {
          data: { exists },
        } = await isExistCheckSavedLetter(selectedPet?.id);

        if (!exists) return;

        const { data } = await getSavedLetter(selectedPet?.id);
        const isTabLive = getSessionAutoSaveID();
        if (data.sessionId !== isTabLive) {
          return dispatch(modalActions.openModal('SAVING'));
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
        }
      }
    };

    const isCheckTabLive = setInterval(() => {
      if (selectedPet?.id) {
        compareSessionId();
      }
    }, 5000);

    return () => clearInterval(isCheckTabLive);
  }, [selectedPet?.id]);

  const uploadImage = async (image: string | File) => {
    const formData = generateFormData(image);
    const { data } = await resisterImage(formData);

    return data.objectKey;
  };

  const isCheckPhoneNumberModalOpen = async () => {
    const { data } = await getUserInfo();
    const expire = getExpireModal();

    if (!data.phoneNumber && Number(expire) < Date.now()) {
      dispatch(modalActions.openModal('PHONE'));
    }
  };

  const isCheckEnModalOpen = () => {
    const unShow = localStorage.getItem('unshow');
    if (unShow !== 'true') {
      return navigate('/letter-box');
    }

    return setEnModalOpen(true);
  };

  const onClickSendButton = useCallback(async () => {
    try {
      setIsLoading(true);
      const newLetter = { ...letter };
      if (imageFile) {
        const objectKey = await uploadImage(imageFile);
        newLetter.image = objectKey;
      }
      await sendLetter(selectedPet?.id, newLetter);
      await deleteSavedLetter(savedLetterId, selectedPet?.id);

      dispatch(letterActions.setSentLetterTarget(selectedPet?.id));
      if (lng === 'ko') {
        isCheckPhoneNumberModalOpen();
        return dispatch(modalActions.openModal('COMPLETE'));
      }
      isCheckEnModalOpen();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [letter, imageFile, selectedPet]);

  if (isFetchLoading) {
    return <Spinner />;
  }

  return (
    <main className="relative">
      {petsList.length > 0 ? (
        <PetsListDropDown
          petName={selectedPet && selectedPet.name}
          petsList={petsList}
          onclick={setSelectedPet}
        />
      ) : (
        <ResisterButtonSection />
      )}
      <LetterPaperWithImage>
        <CoverImage image={formatImageType(selectedPet?.image)} />
        <WritableLetterPaper
          petName={selectedPet?.name}
          onchange={setLetter}
          letter={letter}
        />
      </LetterPaperWithImage>
      <TopicSuggestion />
      <ImageUploadSection setImageFile={setImageFile} />

      {!isLoading ? (
        <Button
          id="letter_submit"
          disabled={letter.content.length < 1 || selectedPet === null}
          onClick={onClickSendButton}
          className="mt-[3.625rem]"
        >
          {t('write.send')}
        </Button>
      ) : (
        <div className="mt-[3.625rem] text-center">
          <ClipLoader color="#FFB347" />
        </div>
      )}
      {isEnModalOpen && (
        <Modal
          isLocalOpen={isEnModalOpen}
          localModalContents={<ReplyInfoModalForEn />}
        />
      )}
    </main>
  );
}
