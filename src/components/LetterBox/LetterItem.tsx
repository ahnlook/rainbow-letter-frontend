import { useMemo } from 'react';

import LetterStatus from 'components/LetterBox/LetterStatus';
import { LetterListResponse } from 'types/letters';
import { isCheckUnread } from 'utils/replyStatus';
import Stamp from '../../assets/im_letterBox_stamp.png';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type Props = {
  letter: LetterListResponse;
  isSelect?: boolean;
};

export default function LetterItem({
  letter: { readStatus, summary, status, number },
  isSelect,
}: Props) {
  const { lng } = useSelector((state: RootState) => state.common);

  const letterIndexValue = useMemo(() => {
    if (lng === 'ko') {
      return `${number}번째 편지`;
    }

    return `Letter ${number}`;
  }, [lng]);

  return (
    <li
      className={`${isSelect ? 'bg-[#ff0000]/[.25]' : isCheckUnread(readStatus, status) ? 'bg-yellow-50' : 'bg-gray-6'} relative mb-4 cursor-pointer rounded-xl p-[1.125rem]`}
    >
      <LetterStatus status={status} readStatus={readStatus} />
      <p className="mt-3 text-caption">{summary}</p>
      <p className="mt-5 text-caption text-gray-3">{letterIndexValue}</p>
      <img
        src={Stamp}
        alt="우표 이미지"
        className="absolute right-[18px] top-[18px]"
      />
    </li>
  );
}
