import React, { Suspense, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';

import NoPets from 'components/MyPetsTemplate/NoPets';
import Spinner from 'components/Spinner';
import { PetResponse } from 'types/pets';
import { LetterListResponse } from 'types/letters';
import { getPets } from 'api/pets';

const PetInfoCard = React.lazy(
  () => import('components/LetterBox/PetInfoCard')
);
const WeekCalendar = React.lazy(
  () => import('components/LetterBox/WeekCalendar')
);
const LetterList = React.lazy(() => import('components/LetterBox/LetterList'));

export default function LetterBoxRenew() {
  const { state } = useLocation();
  const [letterList, setLetterList] = useState<LetterListResponse[]>([]);
  const [petsList, setPetsList] = useState<PetResponse[]>([]);
  const [selectedPet, setSelectedPet] = useState<PetResponse | null>(null);
  const [date, setDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await getPets();

      setPetsList(data.pets || []);

      if (state) {
        const findedPet = data.pets.find(
          (pet: PetResponse) => pet.id === state
        );
        setIsLoading(false);
        return setSelectedPet(findedPet || data.pets[0]);
      }
      setIsLoading(false);
      return setSelectedPet(data.pets[0]);
    })();
  }, []);

  const mappedLetterListByDate = letterList.map((letter) =>
    format(letter.createdAt, 'yyyy-MM-dd')
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      {petsList !== null && petsList.length < 1 ? (
        <NoPets />
      ) : (
        <main className="relative">
          <PetInfoCard
            petsList={petsList}
            selectedPet={selectedPet}
            onChange={setSelectedPet}
            setIsEditing={setIsEditing}
          />
          <WeekCalendar
            setDate={setDate}
            letterList={mappedLetterListByDate}
            setLetterList={setLetterList}
            selectedPet={selectedPet}
            setIsEditing={setIsEditing}
          />
          <LetterList
            date={date}
            selectedPet={selectedPet}
            letterList={letterList}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            setLetterList={setLetterList}
          />
        </main>
      )}
    </Suspense>
  );
}
