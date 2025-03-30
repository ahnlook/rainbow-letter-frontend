import React, { Suspense, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import NoPets from 'components/MyPetsTemplate/NoPets';
import Spinner from 'components/Spinner';
import { PetResponse } from 'types/pets';
import { getPets } from 'api/pets';

const PetInfoCard = React.lazy(
  () => import('components/LetterBox/PetInfoCard')
);
const LetterList = React.lazy(
  () => import('components/LetterBox/LetterListRenew')
);

export default function LetterBoxRenew() {
  const { state } = useLocation();
  const [petsList, setPetsList] = useState<PetResponse[]>([]);
  const [selectedPet, setSelectedPet] = useState<PetResponse | null>(null);
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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      {petsList !== null && petsList.length < 1 ? (
        <NoPets height="h-[72vh]" />
      ) : (
        <main className="relative">
          <PetInfoCard
            petsList={petsList}
            selectedPet={selectedPet}
            onChange={setSelectedPet}
            setIsEditing={setIsEditing}
          />
          <LetterList
            setIsEditing={setIsEditing}
            selectedPet={selectedPet}
            isEditing={isEditing}
          />
        </main>
      )}
    </Suspense>
  );
}
