import { useState, useEffect } from 'react';

type Props = {
  date?: string;
  letter: string | undefined;
  dateType: string | undefined;
};

export default function Caption({ date, letter, dateType }: Props) {
  const [isExceeded, setIsExceeded] = useState<boolean>(false);

  const isCheckExceeded = () => {
    if (letter && letter.length >= 1000) {
      return setIsExceeded(true);
    }

    return setIsExceeded(false);
  };

  useEffect(() => {
    isCheckExceeded();
  }, [letter]);

  return (
    <article className={`date text-right text-caption ${dateType}`}>
      {date ? (
        <p className="font-Gyobomungo2019 text-gray-1">{date}</p>
      ) : (
        <p
          className={`${isExceeded ? 'text-alarm-red' : 'text-gray-2'} absolute right-6 font-sans`}
        >
          {`${letter?.length} / 1000`}
        </p>
      )}
    </article>
  );
}
