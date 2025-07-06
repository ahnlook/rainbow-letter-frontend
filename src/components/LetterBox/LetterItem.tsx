import LetterStatus from 'components/LetterBox/LetterStatus';
import { LetterItemReply } from 'types/letters';
import { isCheckUnread } from 'utils/replyStatus';
import Stamp from '../../assets/im_letterBox_stamp.png';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type Props = {
  letter: LetterItemReply | null;
  isSelect?: boolean;
  letterSummary: string;
  sequence: number;
  readLetterId: number[];
  id: number;
  isReply: boolean;
};

export default function LetterItem({
  letter,
  isSelect,
  letterSummary,
  sequence,
  readLetterId,
  id,
  isReply,
}: Props) {
  const { lng } = useSelector((state: RootState) => state.common);

  const letterIndexValue = () => {
    if (lng === 'ko') {
      return `${sequence}번째 편지`;
    }

    return `Letter ${sequence}`;
  };

  return (
    <li
      className={`${isSelect ? 'bg-[#ff0000]/[.25]' : isCheckUnread(readLetterId.includes(id), isReply) ? 'bg-yellow-50' : 'bg-gray-6'} relative mb-4 cursor-pointer rounded-xl p-[1.125rem]`}
    >
      <LetterStatus isReply={isReply} isRead={readLetterId.includes(id)} />
      <p className="mt-3 text-caption">
        {letter?.submitTime ? letter.summary : letterSummary}
      </p>
      <p className="mt-5 text-caption text-gray-3">{letterIndexValue()}</p>
      <img
        src={Stamp}
        alt="우표 이미지"
        className="absolute right-[18px] top-[18px]"
      />
    </li>
  );
}
