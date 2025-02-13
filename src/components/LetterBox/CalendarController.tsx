import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Up from '../../assets/ic_calendar_up.svg';
import Down from '../../assets/ic_calendar_down.svg';

import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { formatMonthName } from 'utils/date';

type Props = {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  handlePetsListShow: (state: boolean) => void;
};

export default function CalendarController({
  currentDate,
  setCurrentDate,
  handlePetsListShow,
}: Props) {
  const { t } = useTranslation<'translation'>();
  const { lng } = useSelector((state: RootState) => state.common);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());

  useEffect(() => {
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth());
  }, [currentDate]);

  const handleUpYear = useCallback(() => {
    setYear((prev: number) => prev + 1);
  }, []);

  const handleDownYear = useCallback(() => {
    if (year <= 0) {
      return;
    }
    setYear((prev: number) => prev - 1);
  }, [year]);

  const handleUpMonth = useCallback(() => {
    if (month >= 11) {
      return;
    }
    setMonth((prev: number) => prev + 1);
  }, [month]);

  const handleDownMonth = useCallback(() => {
    if (month <= 0) {
      return;
    }
    setMonth((prev: number) => prev - 1);
  }, [month]);

  const onClickConfirmButton = useCallback(() => {
    setCurrentDate(new Date(year, month, 1));
    handlePetsListShow(false);
  }, [year, month]);

  const monthValue = useMemo(() => {
    if (lng === 'ko') {
      return month + 1;
    }

    return formatMonthName(month + 1);
  }, [lng, month]);

  return (
    <article className="flex flex-col justify-center pt-[50px]">
      <div
        className={`${lng === 'ko' ? 'flex-row' : 'flex-row-reverse'} flex items-center justify-center`}
      >
        <div className="flex flex-col items-center gap-1">
          <button type="button" onClick={handleUpYear} className="p-2">
            <img src={Up} alt="위 버튼" />
          </button>
          <p className="text-[30px] font-[500]">{year}</p>
          <button type="button" onClick={handleDownYear} className="p-2">
            <img src={Down} alt="아래 버튼" />
          </button>
        </div>
        <p className="mx-5">{t('letterBox.year')}</p>
        <div className="flex flex-col items-center gap-1">
          <button type="button" onClick={handleUpMonth} className="p-2">
            <img src={Up} alt="위 버튼" />
          </button>
          <p className="text-[30px] font-[500]">{monthValue}</p>
          <button type="button" onClick={handleDownMonth} className="p-2">
            <img src={Down} alt="아래 버튼" />
          </button>
        </div>
        <p className="ml-5">{t('letterBox.month')}</p>
      </div>
      <button
        type="button"
        onClick={onClickConfirmButton}
        className="mx-auto mt-[30px] rounded-[22px] bg-orange-400 px-[30px] py-2.5 text-white"
      >
        {t('letterBox.confirm')}
      </button>
    </article>
  );
}
