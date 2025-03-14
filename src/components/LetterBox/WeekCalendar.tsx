import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootState } from 'store';
import Divider from 'components/Home/Divider';
import MonthCalendar from 'components/LetterBox/MonthCalendar';
import Stamp from '../../assets/ic_letterBox_stamp.svg';
import { PetResponse } from 'types/pets';
import { toUTCDate } from 'utils/date';

type Props = {
  letterList: string[];
  selectedPet: null | PetResponse;
  setIsEditing: (bool: boolean) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  weekCalendarList: string[][];
};

export default function WeekCalendar({
  letterList,
  selectedPet,
  setIsEditing,
  currentDate,
  setCurrentDate,
  weekCalendarList,
}: Props) {
  // redux
  const { t } = useTranslation<'translation'>();
  const DAY_OF_THE_WEEK = [
    t('letterBox.weekdayAbbrSunday'),
    t('letterBox.weekdayAbbrMonday'),
    t('letterBox.weekdayAbbrTuesday'),
    t('letterBox.weekdayAbbrWednesday'),
    t('letterBox.weekdayAbbrThursday'),
    t('letterBox.weekdayAbbrFriday'),
    t('letterBox.weekdayAbbrSaturday'),
  ];
  const { isCalendarOpen } = useSelector((state: RootState) => state.letter);

  // state
  const [weekCalendar, setWeekCalendar] = useState<string[]>([]);

  if (isCalendarOpen) {
    window.scrollTo(0, 0);
  }

  useEffect(() => {
    const findIndex = weekCalendarList.findIndex((weeks: string[]) =>
      weeks.includes(format(currentDate, 'yyyy-MM-dd'))
    );

    setWeekCalendar(weekCalendarList[findIndex]);
  }, [currentDate]);

  const onClickDateButton = useCallback((date: string) => {
    const [year, month, day] = date.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);

    setCurrentDate(selectedDate);
    setIsEditing(false);
  }, []);

  const isExistWrittenLetter = useCallback(
    (date: string) => {
      return letterList.includes(String(date));
    },
    [letterList]
  );

  const isToday = useCallback((date: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return today === date ? 'bg-orange-400' : 'bg-gray-2';
  }, []);

  const isActiveDate = useCallback(
    (date: string) => {
      const [year, month, day] = date.split('-').map(Number);
      const localSelectedDate = new Date(year, month - 1, day);

      const localCurrentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );

      return localSelectedDate.getTime() === localCurrentDate.getTime();
    },
    [currentDate]
  );

  return (
    <>
      <section className="px-4 pb-8">
        <article>
          <ul className="flex justify-around">
            {weekCalendar &&
              weekCalendar.map((day: string, index) => {
                const utcDate = toUTCDate(day);
                const date = utcDate.getUTCDate();
                return (
                  <li
                    key={`letterBox-calendar-${day}`}
                    className="flex flex-col items-center justify-center"
                  >
                    <span
                      key={`letterBox-day-${day}`}
                      className="my-1 text-xs text-gray-5"
                    >
                      {DAY_OF_THE_WEEK[index]}
                    </span>
                    <button
                      type="button"
                      onClick={() => onClickDateButton(day)}
                      className={`${isExistWrittenLetter(day) ? 'bg-orange-50' : isToday(day)} mb-1.5 h-[3.125rem] w-11 rounded-lg`}
                    >
                      {isExistWrittenLetter(day) && (
                        <img src={Stamp} alt="썸네일" className="mx-auto" />
                      )}
                    </button>
                    <p
                      className={`${isActiveDate(day) ? 'bg-orange-400 text-white' : 'text-gray-5'} flex w-[30px] items-center justify-center rounded-[10px] text-xs`}
                    >
                      {date}
                    </p>
                  </li>
                );
              })}
          </ul>
        </article>
      </section>
      {isCalendarOpen && (
        <MonthCalendar
          setDate={setCurrentDate}
          currentWeekDate={currentDate}
          setCurrentWeekDate={setCurrentDate}
          selectedPet={selectedPet}
        />
      )}
      <Divider />
    </>
  );
}
