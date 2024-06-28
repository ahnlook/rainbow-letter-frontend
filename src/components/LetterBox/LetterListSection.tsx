import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import NoLetters from 'components/LetterBox/NoLetters';
import LetterItems from 'components/LetterBox/LetterItems';
import { getLetters } from 'api/letter';
import { Letters } from 'types/letters';

const DEFAULT = '전체';

type Props = {
  pet: typeof DEFAULT | string;
};

export default function LetterListSection({ pet }: Props) {
  const [letterList, setLetterList] = useState<Letters[]>([]);

  useEffect(() => {
    (async () => {
      const { letters } = await getLetters();
      letters.reverse().forEach((letter: Letters, index: number) => {
        const temp = letter;
        temp.number = index + 1;

        return temp;
      });
      setLetterList(letters.reverse() || []);
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
            <Link
              to={`/letter-box/${item.id}`}
              key={item.id}
              state={{ index: item.number }}
            >
              <LetterItems key={item.id} letter={item} index={item.number} />
            </Link>
          ))}
      </ul>
    </section>
  );
}
