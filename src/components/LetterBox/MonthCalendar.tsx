import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { format, addDays, lastDayOfMonth } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

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
import { useTranslation } from 'react-i18next';

import { RootState } from 'store';
import { formatMonthName } from 'utils/date';

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

  // hooks
  const { lng } = useSelector((state: RootState) => state.common);
  const { currentDate, setCurrentDate, monthCalendarList } = useCalendar();
  const { t } = useTranslation<'translation'>();

  useEffect(() => {
    setCurrentDate(currentWeekDate);
  }, []);

  // state
  const [isShow, setIsShow] = useState(false);
  const [monthLetterList, setMonthLetterList] = useState<any>([]);
  const SAVE_DATE = currentWeekDate;

  // etc.
  const yearAndMonth = useMemo(() => {
    if (lng === 'ko') {
      return `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;
    }
    return `${formatMonthName(currentDate.getMonth() + 1)} ${currentDate.getFullYear()}`;
  }, [lng, currentDate]);

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
    format(new Date(letter.createdAt), 'yyyy-MM-dd')
  );

  const handlePetsListShow = useCallback(() => {
    setIsShow((prev) => !prev);
  }, []);

  const onClickDateButton = useCallback(
    (date: string) => {
      setDate(new Date(date));
      setCurrentWeekDate(new Date(date));
      const action = letterSlice.actions.setCalendarClose();
      dispatch(action);
    },
    [dispatch]
  );

  const onClickCalendarClose = useCallback(() => {
    dispatch(letterSlice.actions.setCalendarClose());
    setCurrentWeekDate(SAVE_DATE);
  }, [dispatch]);

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

  const isActiveDate = useCallback(
    (date: string) => {
      const utcDate = new Date(date);
      const localDate = new Date(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate()
      );

      const currentLocalDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );

      return localDate.getTime() === currentLocalDate.getTime();
    },
    [currentDate]
  );

  const toUTCDate = (day: string): Date => {
    const [year, month, date] = day.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, date));
  };

  const handleStandardDate = () => {
    const date = new Date();

    setCurrentDate(date);
  };

  return (
    <>
      <section
        className={`${lng === 'ko' ? '-top-[66px] h-auto' : '-top-[66px] h-dvh'} absolute inset-0 z-50 flex flex-col items-center bg-white px-[1.125rem] pt-[4.125rem]`}
      >
        <button
          type="button"
          onClick={onClickCalendarClose}
          className="absolute right-[18px] top-[18px]"
        >
          <img src={Cancel} alt="취소 버튼" />
        </button>
        <header className="flex w-full justify-end">
          <button
            type="button"
            onClick={handlePetsListShow}
            className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5"
          >
            <p className="text-[1.125rem] font-bold">{yearAndMonth}</p>
            <img src={DropDown} alt="드롭다운 아이콘" />
          </button>
          <div
            onClick={handleStandardDate}
            className="cursor-pointer rounded-[50px] border border-[#BDBDBD] px-2 py-[2px]"
          >
            <p className="text-[12px] font-[500] leading-[16px] text-[#616161]">
              {t('letterBox.thisMonth')}
            </p>
          </div>
        </header>
        <ul className="mt-[30px] w-[354px]">
          {monthCalendarList &&
            monthCalendarList.map((dayArr: string[]) => (
              <li className="flex flex-row justify-start gap-2.5">
                {dayArr.map((day) => {
                  const utcDate = toUTCDate(day);
                  const date = utcDate.getUTCDate();

                  return day === '0' ? (
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
                        {day !== '0' && date}
                      </p>
                    </div>
                  );
                })}
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
