import React, { useEffect, useMemo, useRef } from 'react';

import LetterLengthCaption from 'components/Write/LetterLengthCaption';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type Letter = {
  summary: string;
  content: string;
};

type Props = {
  petName: string | undefined;
  onchange: (letter: any) => void;
  letter: Letter;
};

const MAX_LENGTH = 1000;

export default function WritableLetterPaper({
  petName,
  onchange,
  letter,
}: Props) {
  const { lng } = useSelector((state: RootState) => state.common);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const onUserGuessInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };

  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }
  };

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleResizeHeight();
    if (onchange) {
      onchange({
        ...letter,
        content: e.target.value,
        summary: e.target.value.slice(0, 20),
      });
    }
  };

  useEffect(() => {
    handleResizeHeight();
  }, [letter.content]);

  const letterTargetValue = useMemo(() => {
    if (!petName) return '';

    if (lng === 'ko') {
      return `${petName}에게`;
    }

    return `Dear. ${petName}`;
  }, [petName]);

  return (
    <section className="relative mt-4 pt-[15.187rem]">
      <section className="rounded-2xl bg-orange-50 px-6 py-8 font-Gyobomungo2019 text-body-letter text-gray-1">
        <h3>{letterTargetValue}</h3>
        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleTextarea(e);
          }}
          ref={textarea}
          rows={7}
          maxLength={MAX_LENGTH}
          onInput={onUserGuessInput}
          spellCheck="false"
          value={letter.content}
          className="mt-1 w-full resize-none text-clip whitespace-pre-wrap bg-orange-50 pt-1.5 leading-[170%] outline-0"
        />
        <LetterLengthCaption letter={letter?.content} />
      </section>
    </section>
  );
}
