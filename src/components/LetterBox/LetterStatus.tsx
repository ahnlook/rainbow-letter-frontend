import { useTranslation } from 'react-i18next';

import { letterReplyStatus, isCheckUnread } from 'utils/replyStatus';
import LetterIcon from '../../assets/ic_letterBox_letter.svg';
import Check from '../../assets/ic_letterBox_green-check.svg';
import GrayCheck from '../../assets/ic_letterBox_gray-check.svg';
import { T } from '../../types/translate';

type Props = {
  status: 'RESPONSE' | 'REQUEST';
  readStatus: string;
};

export default function LetterStatus({ status, readStatus }: Props) {
  const { t }: T = useTranslation();
  const letterStatus = letterReplyStatus(status);
  const isCompleteResponse = status === 'RESPONSE';
  const Icon = isCheckUnread(readStatus, status) ? Check : GrayCheck;
  const TextColor = isCheckUnread(readStatus, status)
    ? 'text-green-100'
    : 'text-gray-5';
  const bgColor = isCheckUnread(readStatus, status)
    ? 'bg-green-50'
    : 'bg-gray-7';

  return (
    <div
      className={`${isCompleteResponse ? bgColor : 'bg-alarm-50'} flex h-[1.375rem] w-fit items-center justify-center gap-1 rounded-[15px] px-2.5 py-1`}
    >
      <img
        src={isCompleteResponse ? Icon : LetterIcon}
        alt="답장 상태 아이콘"
      />
      <span
        className={`${isCompleteResponse ? TextColor : 'text-alarm-50'} text-caption-pc font-bold`}
      >
        {t(`letterBox.${letterStatus}`)}
      </span>
    </div>
  );
}
