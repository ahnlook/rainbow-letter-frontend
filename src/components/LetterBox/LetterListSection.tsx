import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getLetters } from 'api/letter';
import { Letters } from 'types/letters';
import NoLetters from 'components/LetterBox/NoLetters';
import LetterItems from 'components/LetterBox/LetterItems';

const DEFAULT = '전체';

type Props = {
  pet: '전체' | string;
};

export default function LetterListSection({ pet }: Props) {
  const [letterList, setLetterList] = useState<Letters[]>([]);

  useEffect(() => {
    (async () => {
      const { letters } = await getLetters();
      setLetterList(letters || []);
    })();
  }, []);

  const filteredLetter: Letters[] =
    pet === DEFAULT
      ? letterList
      : letterList?.filter((item) => item.petName === pet);

  if (filteredLetter !== null && filteredLetter?.length < 1)
    return <NoLetters pet={pet} />;

  return (
    <section className="mt-6">
      <ul>
        {filteredLetter &&
          filteredLetter.map((item) => (
            <Link to={`/letter-box/${item.id}`} key={item.id}>
              <LetterItems key={item.id} letter={item} />
            </Link>
          ))}
      </ul>
    </section>
  );
}