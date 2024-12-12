import { useState, useEffect } from 'react';

import { PetsDashBoard } from 'types/pets';
import { getPetsDashBoard } from 'api/pets';
import NoPets from 'components/Home/NoPets';
import NameSection from 'components/Home/NameSection';
import PetInfo from 'components/Home/PetInfo';
import Spinner from 'components/Spinner';

export default function PetsBox() {
  const [petsList, setPetsList] = useState<PetsDashBoard[]>([]);
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setIsFetchLoading(true);
      const { data } = await getPetsDashBoard();

      setPetsList(data.pets || []);
      if (data.pets.length > 0) {
        setSelectedPet(data.pets[0].name || null);
      }
      setIsFetchLoading(false);
    })();
  }, []);

  const petsNames = petsList.map((pet) => pet.name);
  const filteredPet = petsList.find((pet) => pet.name === selectedPet);

  if (isFetchLoading) {
    return <Spinner className="h-[242px]" />;
  }

  return (
    <section className="flex flex-col gap-y-4">
      {petsList.length < 1 ? (
        <NoPets />
      ) : (
        <>
          <NameSection
            petsNames={petsNames}
            onClick={setSelectedPet}
            selectedPet={selectedPet}
          />
          <PetInfo pet={filteredPet} letterCount={filteredPet?.letterCount} />
        </>
      )}
    </section>
  );
}
