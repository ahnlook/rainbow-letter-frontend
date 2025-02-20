import { Dates } from 'types/date';

type Options = {
  [key: string]: string;
};

export const calculateDDay = (deathAnniversary: string) => {
  const anniversaryDate = new Date(deathAnniversary);
  const today = new Date();

  anniversaryDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const differenceInTime = anniversaryDate.getTime() - today.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return differenceInDays > 0
    ? `D-${Math.ceil(differenceInDays)}`
    : `D+${Math.abs(Math.ceil(differenceInDays)) + 1}`;
};

export const convertDateStringToObject = (dateStr: string) => {
  const parts = dateStr.split('-');
  const year = parts[0];
  const month = String(parseInt(parts[1], 10));
  const day = String(parseInt(parts[2], 10));

  return { year, month, day };
};

export const formatDateToYMD = (data = new Date()): string => {
  const options: Options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  let formattedDate = data.toLocaleDateString('ko-KR', options);
  formattedDate = formattedDate.replace(/\./g, '').replace(/ /g, '-');

  return formattedDate;
};

export const formatDateToYYDDMMHHMM = (date: string): string => {
  if (!date) return '';
  const newDate = new Date(date);
  const year = newDate.getFullYear().toString().substr(-2);
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const day = newDate.getDate().toString().padStart(2, '0');
  const hours = newDate.getHours().toString().padStart(2, '0');
  const minutes = newDate.getMinutes().toString().padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export const getPastDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return formatDateToYMD(date);
};

export const isFutureDate = ({ year, month, day }: Dates<string>): boolean => {
  if (!year || !month || !day) {
    return false;
  }

  const inputDate = new Date(Number(year), Number(month) - 1, Number(day));
  const currentDate = new Date();

  currentDate.setHours(0, 0, 0, 0);

  return inputDate > currentDate;
};

export const isPastNextDay10AM = (dateString: string): boolean => {
  if (!dateString) return false;

  const givenDate = new Date(dateString);
  const nextDay10AM = new Date(
    givenDate.getFullYear(),
    givenDate.getMonth(),
    givenDate.getDate() + 1,
    10,
    0,
    0,
    0
  );

  const now = new Date();
  return now > nextDay10AM;
};

export function formatDateToYYMMDDHHSS(isoString: string) {
  const date = new Date(isoString);

  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function formatDateToYYMMDD(isoString: string) {
  const date = new Date(isoString);

  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const formatDateIncludingHangul = (date: string) => {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);

  return `${year}년 ${month}월 ${day}일`;
};

export const formatDateIncludingEnglish = (date: string) => {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);

  return `${formatMonthName(Number(month))?.slice(0, 3)} ${day}, ${year}`;
};

export const formatDateWithSlash = (date: string) => {
  const year = date.slice(2, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = week[new Date(date).getDay()];

  return `${year}/${month}/${day}(${dayOfWeek})`;
};

export const formatKoDay = (value: number) => {
  switch (value) {
    case 0:
      return '일';
    case 1:
      return '월';
    case 2:
      return '화';
    case 3:
      return '수';
    case 4:
      return '목';
    case 5:
      return '금';
    default:
      return '토';
  }
};

export const formatDay = (value: number) => {
  switch (value) {
    case 0:
      return 'letterBox.weekdayFullSunday';
    case 1:
      return 'letterBox.weekdayFullMonday';
    case 2:
      return 'letterBox.weekdayFullTuesday';
    case 3:
      return 'letterBox.weekdayFullWednesday';
    case 4:
      return 'letterBox.weekdayFullThursday';
    case 5:
      return 'letterBox.weekdayFullFriday';
    default:
      return 'letterBox.weekdayFullSaturday';
  }
};

export const formatMonthName = (month: number) => {
  switch (month) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
  }
};

export const getTimeUntilKST10AM = () => {
  const nowUTC = new Date();

  const KST_OFFSET_HOURS = 9;
  const KSTTarget = new Date(nowUTC);

  KSTTarget.setUTCHours(10 - KST_OFFSET_HOURS, 0, 0, 0);

  if (nowUTC.getTime() >= KSTTarget.getTime()) {
    KSTTarget.setUTCDate(KSTTarget.getUTCDate() + 1);
  }

  const timeDifferenceMs = KSTTarget.getTime() - nowUTC.getTime();
  const calHours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
  const calMinutes =
    Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)) + 1;

  const hours = String(calHours);
  const minutes = String(calMinutes);
  return { hours, minutes };
};
