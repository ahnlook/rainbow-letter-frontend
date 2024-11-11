import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { format, addDays, lastDayOfMonth } from 'date-fns';
import { useDispatch } from 'react-redux';
import { toZonedTime } from 'date-fns-tz';

import BottomSheet from 'components/Common/BottomSheet';
import CalendarController from 'components/LetterBox/CalendarController';
import letterSlice from 'store/letter/letter-slice';
import Left from '../../assets/ic_letterBox_left.svg';
import Right from '../../assets/ic_letterBox_right.svg';
import DropDown from '../../assets/ic_letterBox_dropdown.svg';
import Stamp from '../../assets/ic_letterBox_stamp.svg';
import Cancel from '../../assets/ic_calendar_x.svg';
import { PetResponse } from 'types/pets';
import { getLetterListByDate } from 'api/letter';
import useCalendar from 'hooks/useCalendar';

type Props = {
  setDate: (date: Date) => void;
  currentWeekDate: Date;
  setCurrentWeekDate: (date: Date) => void;
  selectedPet: null | PetResponse;
};

export default function MonthCalendar({
  setDate,
  setCurrentWeekDate,
  currentWeekDate,
  selectedPet,
}: Props) {
  // redux
  const dispatch = useDispatch();

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localDate = toZonedTime(currentWeekDate, timeZone);

  // hooks
  const { currentDate, setCurrentDate, monthCalendarList } =
    useCalendar(localDate);

  // state
  const [isShow, setIsShow] = useState(false);
  const [monthLetterList, setMonthLetterList] = useState<any>([]);
  const SAVE_DATE = currentWeekDate;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const firstDayOfTheMonth = useMemo(() => {
    const firstDayOfTheMonth = monthCalendarList[0].find(
      (date: string) => Number(date) !== 0
    );

    return firstDayOfTheMonth;
  }, [monthCalendarList]);

  const lastDayOfTheMonth = useMemo(() => {
    const lastDayOfTheMonth = monthCalendarList[
      monthCalendarList.length - 1
    ].findLast((date: string) => Number(date) !== 0);

    return lastDayOfTheMonth;
  }, [monthCalendarList]);

  useEffect(() => {
    (async () => {
      if (selectedPet?.id === undefined) return;

      const {
        data: { letters },
      } = await getLetterListByDate(
        selectedPet?.id,
        firstDayOfTheMonth,
        lastDayOfTheMonth
      );
      setMonthLetterList(letters || []);
    })();
  }, [firstDayOfTheMonth]);

  const mappedLetterListByDate = monthLetterList.map((letter: any) =>
    format(letter.createdAt, 'yyyy-MM-dd')
  );

  const handlePetsListShow = useCallback(() => {
    setIsShow((prev) => !prev);
  }, []);

  const yearAndMonth = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

  const onClickNextMonth = useCallback(() => {
    const lastDay = lastDayOfMonth(currentDate);
    setCurrentDate(addDays(lastDay, 1));
  }, [currentDate]);

  const onClickPrevMonth = useCallback(() => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  }, [currentDate]);

  const onClickDateButton = useCallback((date: string) => {
    setDate(new Date(date));
    setCurrentWeekDate(new Date(date));
    const action = letterSlice.actions.setCalendarClose();
    dispatch(action);
  }, []);

  const onClickCalendarClose = useCallback(() => {
    const action = letterSlice.actions.setCalendarClose();
    dispatch(action);
    setCurrentWeekDate(SAVE_DATE);
  }, [dispatch]);

  const isActiveDate = useCallback(
    (date: string) => {
      if (format(currentDate, 'yyyy-MM-dd') === date) {
        return true;
      }

      return false;
    },
    [currentDate]
  );

  const isExistWrittenLetter = useCallback(
    (date: string) => {
      return mappedLetterListByDate.includes(date);
    },
    [mappedLetterListByDate]
  );

  const isToday = useCallback((date: string) => {
    const today = format(new Date(), 'yyyy-MM-dd');

    return today === date ? 'bg-orange-400' : 'bg-gray-2';
  }, []);

  return (
    <>
      <section className="absolute inset-0 -top-[66px] z-50 flex h-auto flex-col items-center bg-white px-[1.125rem] pt-[4.125rem]">
        <button
          type="button"
          onClick={onClickCalendarClose}
          className="absolute right-[18px] top-[18px]"
        >
          <img src={Cancel} alt="취소 버튼" />
        </button>
        <header className="flex w-full justify-between">
          <button
            type="button"
            onClick={onClickPrevMonth}
            className="flex items-center gap-1.5"
          >
            <img src={Left} alt="왼쪽 화살표 아이콘" />
            <span className="mt-px text-[12px]">이전 달</span>
          </button>
          <button
            type="button"
            onClick={handlePetsListShow}
            className="flex items-center"
          >
            <p className="text-[1.125rem] font-bold">{yearAndMonth}</p>
            <img src={DropDown} alt="드롭다운 아이콘" />
          </button>
          <button
            type="button"
            onClick={onClickNextMonth}
            className="flex items-center gap-1.5"
          >
            <span className="mt-px text-[12px]">다음 달</span>
            <img src={Right} alt="오른쪽 화살표 아이콘" />
          </button>
        </header>
        <ul className="mt-[30px] w-[354px]">
          {monthCalendarList &&
            monthCalendarList.map((dayArr: string[]) => (
              <li className="flex flex-row justify-start gap-2.5">
                {dayArr.map((day) =>
                  day === '0' ? (
                    <div className="mb-3">
                      <button type="button" className="mb-1 size-[42px]">
                        {day === '0'}
                      </button>
                    </div>
                  ) : (
                    <div className="mb-3">
                      <button
                        type="button"
                        onClick={() => onClickDateButton(day)}
                        className={`${isExistWrittenLetter(day) ? 'bg-orange-50' : isToday(day)} mb-1 size-[42px] rounded-lg`}
                      >
                        {isExistWrittenLetter(day) && (
                          <img src={Stamp} alt="썸네일" className="mx-auto" />
                        )}
                      </button>
                      <p
                        className={`${isActiveDate(day) ? 'bg-orange-400 text-white' : 'text-gray-5'} mx-auto w-[30px] rounded-[10px] text-center text-xs`}
                      >
                        {day !== '0' && format(day, 'dd')}
                      </p>
                    </div>
                  )
                )}
              </li>
            ))}
        </ul>
      </section>
      <BottomSheet
        isShow={isShow}
        handlePetsListShow={handlePetsListShow}
        contents={
          <CalendarController
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            handlePetsListShow={handlePetsListShow}
          />
        }
      />
    </>
  );
}
