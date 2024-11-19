import { useState } from 'react';
import { format, subDays, getDaysInMonth } from 'date-fns';

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

  const normalizeDate = (date: Date): Date => {
    const normalized = new Date(date);
    normalized.setHours(12, 0, 0, 0);
    return normalized;
  };

  // 이전 달 날짜들 계산
  const prevDayListForWeeks = Array.from({ length: prevDaysCount }).map(
    (_, i) => {
      const date = normalizeDate(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          prevMonthLastDay - prevDaysCount + i + 1
        )
      );
      return format(date, 'yyyy-MM-dd');
    }
  );

  // 현재 달 날짜들 계산
  const currentDayListForWeeks = Array.from({ length: totalMonthDays }).map(
    (_, i) => {
      const date = normalizeDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
      );
      return format(date, 'yyyy-MM-dd');
    }
  );

  // 다음 달 날짜들 계산
  const nextDayListForWeeks = Array.from({ length: nextDaysCount }).map(
    (_, i) => {
      const date = normalizeDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i + 1)
      );
      return format(date, 'yyyy-MM-dd');
    }
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

  // 현재 달 날짜들 (monthCalendarList용)
  const currentDayList = Array.from({ length: totalMonthDays }).map((_, i) => {
    const date = normalizeDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
    );
    return format(date, 'yyyy-MM-dd');
  });

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

  return {
    currentDate,
    setCurrentDate: (date: Date | ((prev: Date) => Date)) => {
      // setCurrentDate 호출 시에도 날짜 정규화 적용
      if (date instanceof Date) {
        setCurrentDate(normalizeDate(date));
      } else {
        setCurrentDate((prev) => normalizeDate(date(prev)));
      }
    },
    weekCalendarList,
    monthCalendarList,
  };
};

export default useCalendar;
