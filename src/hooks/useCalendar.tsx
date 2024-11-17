import { useState } from 'react';
import { format, subDays, getDaysInMonth } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { toZonedTime } from 'date-fns-tz';

const CALENDER_LENGTH = 35;
const WEEK_CALENDAR_LENGTH = 42;
const DEFAULT_TRASH_VALUE = '0';
const DAY_OF_WEEK = 7;

const useCalendar = (monthCurrentDate?: Date) => {
  const [currentDate, setCurrentDate] = useState(
    monthCurrentDate || new Date()
  );

  const totalMonthDays = getDaysInMonth(currentDate); // 한달에 총 며칠인지
  const firstDayOfMonth = new Date( // 이번 달의 1일
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const prevDaysCount = firstDayOfMonth.getDay(); // 이번 달의 1일이 무슨 요일인지
  const prevMonthLastDay = subDays(firstDayOfMonth, 1).getDate(); // 이전 달의 마지막 날
  const nextDaysCount = // 다음 달 1일이 무슨 요일인지
    (WEEK_CALENDAR_LENGTH - totalMonthDays - prevDaysCount) % DAY_OF_WEEK;

  // 이번 달 첫번째 주의 저번 달 날짜들
  const prevDayListForWeeks = Array.from({ length: prevDaysCount }).map(
    (_, i) =>
      format(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          prevMonthLastDay - prevDaysCount + i + 1
        ),
        'yyyy-MM-dd'
      )
  );

  // 이번 달 날짜들
  const currentDayListForWeeks = Array.from({ length: totalMonthDays }).map(
    (_, i) =>
      format(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1),
        'yyyy-MM-dd'
      )
  );

  // 이번 달 마지막 주의 다음 달의 날짜들
  const nextDayListForWeeks = Array.from({ length: nextDaysCount }).map(
    (_, i) =>
      format(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i + 1),
        'yyyy-MM-dd'
      )
  );

  // 이번 달의 저번 달 날짜들부터 이번 달의 다음 달 날짜들
  const currentCalendarListForWeeks = [
    ...prevDayListForWeeks,
    ...currentDayListForWeeks,
    ...nextDayListForWeeks,
  ];

  // 저번 달, 다음 달 겹친 날을 7개씩 이중 배열로 가공
  const weekCalendarList = currentCalendarListForWeeks.reduce(
    (acc: any, cur, idx) => {
      const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      acc[chunkIndex].push(cur);

      return acc;
    },
    []
  );

  // 이번 달 첫번째 주의 저번 달 날짜들(0)
  const prevDayList = Array.from({
    length: Math.max(
      0,
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
    ),
  }).map(() => DEFAULT_TRASH_VALUE);

  // 이번 달 날짜들
  const currentDayList = Array.from({ length: totalMonthDays }).map((_, i) =>
    format(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1),
      'yyyy-MM-dd'
    )
  );

  // 이번 달 마지막 주의 다음 달의 날짜들(0)
  const nextDayList = Array.from({
    length: CALENDER_LENGTH - currentDayList.length - prevDayList.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  // 이번 달 내의 저번 달 날짜들 ~ 이번 달 내의 다음 달 날짜들(0)
  const currentCalendarList = [
    ...prevDayList,
    ...currentDayList,
    ...nextDayList,
  ];

  // 저번 달 ~ 다음 달을 7개씩 이중 배열로 가공(0)
  const monthCalendarList = currentCalendarList.reduce((acc: any, cur, idx) => {
    const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(cur);

    return acc;
  }, []);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date = new Date();
  const userTime = formatInTimeZone(date, userTimeZone, 'yyyy-MM-dd HH:mm');
  const korTime = formatInTimeZone(date, 'Asia/Seoul', 'yyyy-MM-dd HH:mm');

  console.log('현재 설정된 시간: ', currentDate);
  console.log('이번 달이 총 며칠인지: ', totalMonthDays);
  console.log('이번 달의 1일: ', firstDayOfMonth);
  console.log('이번 달의 1일이 무슨 요일인지: ', prevDaysCount);
  console.log('이전 달의 마지막 날: ', prevMonthLastDay);
  console.log('다음 달 1일이 무슨 요일인지: ', nextDaysCount);
  console.log('이번 달 첫번째 주의 저번 달 날짜들: ', prevDayListForWeeks);
  console.log('이번 달 날짜들: ', currentDayListForWeeks);
  console.log('이번 달 마지막 주의 다음 달의 날짜들: ', totalMonthDays);
  console.log(
    '이번 달의 저번 달 날짜들부터 이번 달의 다음 달 날짜들: ',
    currentCalendarListForWeeks
  );
  console.log('현재 유저 시간(테스트): ', userTime);
  console.log('한국 시간으로 강제: ', korTime);

  return {
    currentDate,
    setCurrentDate,
    weekCalendarList,
    monthCalendarList,
  };
};

export default useCalendar;
