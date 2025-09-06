import { useTranslation } from 'react-i18next';
import { letterReplyStatus, isCheckUnread } from 'utils/replyStatus';
import LetterIcon from '../../assets/ic_letterBox_letter.svg';
import Check from '../../assets/ic_letterBox_green-check.svg';
import BlueCheck from '../../assets/ic_blueCheck.svg';
import GrayCheck from '../../assets/ic_letterBox_gray-check.svg';

type Props = {
  isReply: boolean;
  isRead: boolean;
  type?: 'letter' | 'petLetter';
};

const STATUS_ICON = Object.freeze({
  LETTER: LetterIcon,
  LETTER_READ: GrayCheck,
  LETTER_UNREAD: Check,
  PET_LETTER_READ: GrayCheck,
  PET_LETTER_UNREAD: BlueCheck,
});

const STATUS_BG = Object.freeze({
  LETTER: 'bg-alarm-50',
  LETTER_READ: 'bg-green-50',
  LETTER_UNREAD: 'bg-gray-7',
  PET_LETTER_READ: 'bg-gray-7',
  PET_LETTER_UNREAD: 'bg-[#E2F2FB]',
});

const STATUS_TEXT_COLOR = Object.freeze({
  LETTER: 'text-alarm-50',
  LETTER_READ: 'text-gray-5',
  LETTER_UNREAD: 'text-green-100',
  PET_LETTER_READ: 'text-gray-5',
  PET_LETTER_UNREAD: 'text-[#15ADFF]',
});

export default function LetterStatus({ isReply, isRead, type }: Props) {
  const { t } = useTranslation<'translation'>();

  const getStatusIcon = () => {
    if (!isReply && type === 'letter') {
      return STATUS_ICON.LETTER;
    }

    if (type === 'petLetter') {
      return isRead
        ? STATUS_ICON.PET_LETTER_READ
        : STATUS_ICON.PET_LETTER_UNREAD;
    }

    return isCheckUnread(isRead, isReply)
      ? STATUS_ICON.LETTER_UNREAD
      : STATUS_ICON.LETTER_READ;
  };

  const getStatusBg = () => {
    if (!isReply && type === 'letter') {
      return STATUS_BG.LETTER;
    }

    if (type === 'petLetter') {
      return isRead ? STATUS_BG.PET_LETTER_READ : STATUS_BG.PET_LETTER_UNREAD;
    }

    return isCheckUnread(isRead, isReply)
      ? STATUS_BG.LETTER_READ
      : STATUS_BG.LETTER_UNREAD;
  };

  const getTextColor = () => {
    if (!isReply && type === 'letter') {
      return STATUS_TEXT_COLOR.LETTER;
    }

    if (type === 'petLetter') {
      return isRead
        ? STATUS_TEXT_COLOR.PET_LETTER_READ
        : STATUS_TEXT_COLOR.PET_LETTER_UNREAD;
    }

    return isCheckUnread(isRead, isReply)
      ? STATUS_TEXT_COLOR.LETTER_UNREAD
      : STATUS_TEXT_COLOR.LETTER_READ;
  };

  const Icon = getStatusIcon();
  const Bg = getStatusBg();
  const TextColor = getTextColor();

  const letterStatus = letterReplyStatus(isReply);

  return (
    <div
      className={`${Bg} flex h-[1.375rem] w-fit items-center justify-center gap-1 rounded-[15px] px-2.5 py-1`}
    >
      <img src={Icon} alt="답장 상태 아이콘" />
      <span className={`${TextColor} text-caption-pc font-bold`}>
        {type === 'letter' ? t(`letterBox.${letterStatus}`) : '편지 도착'}
      </span>
    </div>
  );
}
