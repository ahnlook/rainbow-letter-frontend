import { useTranslation } from 'react-i18next';

import { letterReplyStatus, isCheckUnread } from 'utils/replyStatus';
import LetterIcon from '../../assets/ic_letterBox_letter.svg';
import Check from '../../assets/ic_letterBox_green-check.svg';
import GrayCheck from '../../assets/ic_letterBox_gray-check.svg';

type Props = {
  submitTime: null | string;
  isRead: boolean;
};

export default function LetterStatus({ submitTime, isRead }: Props) {
  const { t } = useTranslation<'translation'>();
  const letterStatus = letterReplyStatus(submitTime);
  const isCompleteResponse = submitTime !== null;
  const Icon = isCheckUnread(isRead, submitTime) ? Check : GrayCheck;
  const TextColor = isCheckUnread(isRead, submitTime)
    ? 'text-green-100'
    : 'text-gray-5';
  const bgColor = isCheckUnread(isRead, submitTime)
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
