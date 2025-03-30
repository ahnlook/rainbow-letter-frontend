import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Chip from 'components/Chips/Chip';
import NoPets from 'components/MyPetsTemplate/NoPets';
import { getPets } from 'api/pets';
import { PetResponse } from 'types/pets';

const DEFAULT = '전체';

type Props = {
  onChange: (name: string) => void;
  selectedPet: '전체' | string;
};

export default function NameSection({ onChange, selectedPet }: Props) {
  const [petsList, setPetsList] = useState<string[]>([]);
  const { state } = useLocation();

  useEffect(() => {
    (async () => {
      const { data } = await getPets();
      const petsNames = data.pets.map((pet: PetResponse) => pet.name);

      setPetsList((data.pets.length > 0 && [DEFAULT, ...petsNames]) || []);

      if (state) {
        const findedPet = data.pets.find(
          (pet: PetResponse) => pet.id === state
        );
        onChange(findedPet?.name || DEFAULT);
      }
    })();
  }, []);

  if (petsList !== null && petsList.length < 1)
    return <NoPets height="h-[72vh]" />;

  return (
    <nav>
      <ul className="flex flex-wrap gap-2">
        {petsList &&
          petsList.map((name) => (
            <Chip
              key={name}
              value={name}
              isSelected={name === selectedPet}
              onClick={() => onChange(name)}
            />
          ))}
      </ul>
    </nav>
  );
}
