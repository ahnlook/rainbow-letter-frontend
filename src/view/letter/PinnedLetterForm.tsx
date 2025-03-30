import { useState, useEffect } from 'react';
import RadioSection from 'components/PinnedLetterForm/RadioSection';
import SelectPetSection from 'components/PinnedLetterForm/SelectPetSection';
import { PetResponse } from 'types/pets';
import LetterContentsSection from 'components/PinnedLetterForm/LetterContentsSection';
import Button from 'components/Button';
import { tryPinSharedLetter } from 'api/pets';
import { useNavigate } from 'react-router-dom';
import { getPets } from 'api/pets';
import NoPets from 'components/MyPetsTemplate/NoPets';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { Suspense } from 'react';
import Spinner from 'components/Spinner';
import Disclaimer from 'components/PinnedLetterForm/Disclaimer';

export interface PinnedLetterFormType {
  content: string;
  recipientType: string;
}

export default function PinnedLetterForm() {
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState<PetResponse | null>(null);
  const [letterContents, setLetterContents] = useState<PinnedLetterFormType>({
    content: '',
    recipientType: '0',
  });
  const [petsList, setPetsList] = useState<PetResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getPetLoading, setGetPetLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setGetPetLoading(true);
      const { data } = await getPets();

      setPetsList(data.pets || []);

      setGetPetLoading(false);
      return setSelectedPet(data.pets[0]);
    })();
  }, []);

  const handleRadioButton = (recipientType: string) => {
    setLetterContents((prev) => ({ ...prev, recipientType }));
  };

  const handleLetterContent = (content: string) => {
    setLetterContents((prev) => ({ ...prev, content }));
  };

  const onClickSubmit = async () => {
    try {
      setIsLoading(true);
      await tryPinSharedLetter(selectedPet?.id, letterContents);
      alert('편지가 성공적으로 걸렸습니다');
      navigate('/letters/letter-showcase');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(`${selectedPet?.name}에게 이미 작성된 편지가 있습니다 `);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (getPetLoading) {
    return <Spinner />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      {petsList.length === 0 ? (
        <NoPets height="h-[80vh]" />
      ) : (
        <section className="flex flex-col px-[18px] pt-[30px]">
          <RadioSection
            selectRadio={letterContents.recipientType}
            handleRadioButton={handleRadioButton}
          />
          <SelectPetSection
            setSelectedPet={setSelectedPet}
            selectedPet={selectedPet}
            petsList={petsList}
          />
          <LetterContentsSection
            content={letterContents.content}
            handleLetterContent={handleLetterContent}
          />
          <Disclaimer />
          {!isLoading ? (
            <Button
              disabled={letterContents.content.length < 10}
              onClick={onClickSubmit}
              className="mt-[52px]"
            >
              제출하기
            </Button>
          ) : (
            <div className="mt-16 text-center">
              <ClipLoader color="#FFB347" />
            </div>
          )}
        </section>
      )}
    </Suspense>
  );
}
