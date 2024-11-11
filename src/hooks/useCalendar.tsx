import { useState } from 'react';
import { subDays, getDaysInMonth } from 'date-fns';
import { format, toZonedTime } from 'date-fns-tz';

const CALENDAR_LENGTH = 35;
const WEEK_CALENDAR_LENGTH = 42;
const DEFAULT_TRASH_VALUE = '0';
const DAY_OF_WEEK = 7;

const useCalendar = (monthCurrentDate?: Date) => {
  const date = new Date();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = toZonedTime(date, timeZone);

  const [currentDate, setCurrentDate] = useState(monthCurrentDate || localDate);

  const totalMonthDays = getDaysInMonth(currentDate);
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const prevMonthLastDay = subDays(firstDayOfMonth, 1).getDate();
  const prevDaysCount = firstDayOfMonth.getDay();
  const nextDaysCount =
    (WEEK_CALENDAR_LENGTH - totalMonthDays - prevDaysCount) % DAY_OF_WEEK;

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

  const currentDayListForWeeks = Array.from({ length: totalMonthDays }).map(
    (_, i) =>
      format(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1),
        'yyyy-MM-dd'
      )
  );

  const nextDayListForWeeks = Array.from({ length: nextDaysCount }).map(
    (_, i) =>
      format(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i + 1),
        'yyyy-MM-dd'
      )
  );

  const currentCalendarListForWeeks = prevDayListForWeeks.concat(
    currentDayListForWeeks,
    nextDayListForWeeks
  );

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

  const prevDayList = Array.from({
    length: Math.max(0, firstDayOfMonth.getDay()),
  }).map(() => DEFAULT_TRASH_VALUE);

  const currentDayList = Array.from({ length: totalMonthDays }).map((_, i) =>
    format(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1),
      'yyyy-MM-dd'
    )
  );

  const nextDayList = Array.from({
    length: CALENDAR_LENGTH - currentDayList.length - prevDayList.length,
  }).map(() => DEFAULT_TRASH_VALUE);

  const currentCalendarList = [
    ...prevDayList,
    ...currentDayList,
    ...nextDayList,
  ];

  const monthCalendarList = currentCalendarList.reduce((acc: any, cur, idx) => {
    const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(cur);

    return acc;
  }, []);

  return {
    monthCalendarList,
    currentDate,
    setCurrentDate,
    weekCalendarList,
  };
};

export default useCalendar;
