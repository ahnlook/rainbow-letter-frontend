import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { format, addDays, subDays } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootState } from 'store';
import useCalendar from 'hooks/useCalendar';
import letterSlice from 'store/letter/letter-slice';
import Divider from 'components/Home/Divider';
import MonthCalendar from 'components/LetterBox/MonthCalendar';
import Left from '../../assets/ic_letterBox_left.svg';
import Right from '../../assets/ic_letterBox_right.svg';
import DropDown from '../../assets/ic_letterBox_dropdown.svg';
import Stamp from '../../assets/ic_letterBox_stamp.svg';
import { PetResponse } from 'types/pets';
import { getLetterList } from 'api/letter';
import { LetterListResponse } from 'types/letters';
import { T } from '../../types/translate';
import { formatMonthName } from 'utils/date';
import UntilTimeBox from './UntilTimeBox';

type Props = {
  setDate: (date: Date) => void;
  letterList: string[];
  setLetterList: (date: LetterListResponse[]) => void;
  selectedPet: null | PetResponse;
  setIsEditing: (bool: boolean) => void;
};

export default function WeekCalendar({
  setDate,
  letterList,
  setLetterList,
  selectedPet,
  setIsEditing,
}: Props) {
  // redux
  const dispatch = useDispatch();
  const { t }: T = useTranslation();
  const DAY_OF_THE_WEEK = [
    t('letterBox.weekdayAbbrSunday'),
    t('letterBox.weekdayAbbrMonday'),
    t('letterBox.weekdayAbbrTuesday'),
    t('letterBox.weekdayAbbrWednesday'),
    t('letterBox.weekdayAbbrThursday'),
    t('letterBox.weekdayAbbrFriday'),
    t('letterBox.weekdayAbbrSaturday'),
  ];
  const { lng } = useSelector((state: RootState) => state.common);
  const { isCalendarOpen } = useSelector((state: RootState) => state.letter);

  // hooks
  const { currentDate, setCurrentDate, weekCalendarList } = useCalendar();

  // state
  const [weekCalendar, setWeekCalendar] = useState<string[]>([]);

  // etc.
  const yearAndMonth = useMemo(() => {
    if (lng === 'ko') {
      return `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;
    }
    return `${formatMonthName(currentDate.getMonth() + 1)} ${currentDate.getFullYear()}`;
  }, [lng, currentDate]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(letterSlice.actions.setCalendarClose());
  }, []);

  useEffect(() => {
    (async () => {
      if (selectedPet?.id === undefined || weekCalendar.length <= 0) return;

      const {
        data: { letters },
      } = await getLetterList(selectedPet?.id);

      setLetterList(letters || []);
    })();
  }, [selectedPet, weekCalendar]);

  useEffect(() => {
    const findIndex = weekCalendarList.findIndex((weeks: string[]) =>
      weeks.includes(format(currentDate, 'yyyy-MM-dd'))
    );

    setWeekCalendar(weekCalendarList[findIndex]);
  }, [currentDate]);

  const onClickNextWeek = useCallback(() => {
    setCurrentDate(addDays(currentDate, 7));
    setDate(addDays(currentDate, 7));
    setIsEditing(false);
  }, [currentDate]);

  const onClickPrevWeek = useCallback(() => {
    setCurrentDate(subDays(currentDate, 7));
    setDate(subDays(currentDate, 7));
    setIsEditing(false);
  }, [currentDate]);

  const onClickDateButton = useCallback((date: string) => {
    const [year, month, day] = date.split('-').map(Number);
    const selectedDate = new Date(year, month - 1, day);

    setCurrentDate(selectedDate);
    setDate(selectedDate);
    setIsEditing(false);
  }, []);

  const onClickMonthCalendar = useCallback(() => {
    const action = letterSlice.actions.setCalendarOpen();
    dispatch(action);
    setIsEditing(false);
  }, [dispatch]);

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

  const toUTCDate = (day: string): Date => {
    const [year, month, date] = day.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, date));
  };

  return (
    <>
      <section className="px-[1.125rem] py-6">
        {lng === 'en' && <UntilTimeBox />}
        <header className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={onClickPrevWeek}
            className="flex items-center gap-1.5"
          >
            <img src={Left} alt="왼쪽 화살표 아이콘" />
            <span className="mt-px text-[12px]">{t('letterBox.prevWeek')}</span>
          </button>
          <button
            type="button"
            onClick={onClickMonthCalendar}
            className="flex items-center"
          >
            <p className="text-[1.125rem] font-bold">{yearAndMonth}</p>
            <img src={DropDown} alt="드롭다운 아이콘" />
          </button>
          <button
            type="button"
            onClick={onClickNextWeek}
            className="flex items-center gap-1.5"
          >
            <span className="mt-px text-[12px]">{t('letterBox.nextWeek')}</span>
            <img src={Right} alt="오른쪽 화살표 아이콘" />
          </button>
        </header>
        <article className="mt-2">
          <ul className="mt-1.5 flex justify-around">
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
          setDate={setDate}
          currentWeekDate={currentDate}
          setCurrentWeekDate={setCurrentDate}
          selectedPet={selectedPet}
        />
      )}
      <Divider />
    </>
  );
}
