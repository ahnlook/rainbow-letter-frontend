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

export const letterReplyStatus = (reply: string | null) => {
  if (reply === null) {
    return 'replying';
  }

  return 'received';
};

export const isCheckUnread = (
  isRead: boolean,
  submitTime: string | null
): boolean => {
  if (submitTime === null) return false;
  if (isRead) return false;

  return true;
};
