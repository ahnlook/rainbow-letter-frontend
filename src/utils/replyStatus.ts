import { isPastNextDay10AM } from 'utils/date';

export const checkLetterStatus = (
  inspectionDate: string,
  dispatchDate: string
) => {
  const isInspectionPassed = isPastNextDay10AM(inspectionDate);
  // const isDispatched = dispatchDate && isPastNextDay10AM(dispatchDate);

  if (dispatchDate) return '성공';

  if (!inspectionDate && !dispatchDate) {
    return '';
  }

  if (!isInspectionPassed) {
    return '대기';
  }

  if (isInspectionPassed && !dispatchDate) {
    return '실패';
  }
};

export const letterReplyStatus = (isReply: boolean) => {
  if (!isReply) {
    return 'replying';
  }

  return 'received';
};

export const isCheckUnread = (
  isRead: boolean,
  isReply: boolean | undefined
): boolean => {
  if (!isReply) return false;
  if (isRead) return false;

  return true;
};
