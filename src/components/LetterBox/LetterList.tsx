import { useMemo, useCallback } from 'react';
import { format, getDay } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootState } from 'store';
import LetterItem from 'components/LetterBox/LetterItem';
import Button from 'components/Button';
import { LetterListResponse, PetLetterResponse } from 'types/letters';
import { PetResponse } from 'types/pets';
import { formatDay, formatMonthName, formatKoDay } from 'utils/date';
import Plus from '../../assets/ic_letterBox_plus.svg';
import Info from '../../assets/ic_letterBox_info.svg';
import Top from '../../assets/ic_letterBox_top.svg';

type Props = {
  date: Date;
  selectedPet: PetResponse | null;
  isEditing: boolean;
  isCalendarMode: boolean;
  isSelectLetterItem: boolean;
  isExistTodayLetter: boolean;
  onClickEditButton: () => void;
  handleLocalModal: () => void;
  letterList: LetterListResponse[];
  petLetters?: PetLetterResponse[];
  handleLetterCheck: (id: number) => void;
  selectedLetterList: number[];
  onLetterClick: (letterId: number) => void;
  readLetterId: number[];
};

export default function LetterList({
  date,
  selectedPet,
  isEditing,
  isCalendarMode,
  isSelectLetterItem,
  isExistTodayLetter,
  onClickEditButton,
  handleLocalModal,
  letterList,
  petLetters = [],
  handleLetterCheck,
  selectedLetterList,
  onLetterClick,
  readLetterId,
}: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation<'translation'>();
  const { lng } = useSelector((state: RootState) => state.common);

  const localDate = useMemo(() => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }, [date]);

  const dateAndDay = useMemo(() => {
    if (lng === 'ko') {
      return `${format(localDate, 'M월 dd일')} ${formatKoDay(getDay(localDate))}요일`;
    }

    return `${t(formatDay(getDay(localDate)))}, ${formatMonthName(date.getMonth() + 1)} ${date.getDate()}`;
  }, [lng, date]);

  const isToday = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');

    return today === format(date, 'yyyy-MM-dd');
  }, [date]);

  const onClickWriteLetterButton = useCallback(() => {
    navigate('/write-letter', { state: selectedPet?.id });
  }, [selectedPet?.id]);

  const onClickTopScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const listDate = (date: string) => {
    const splittedDate = date.split('T')[0];
    const newDate = new Date(splittedDate);
    if (lng === 'ko') {
      return `${format(newDate, 'M월 dd일')} ${formatKoDay(getDay(newDate))}요일`;
    }

    return `${t(formatDay(getDay(newDate)))}, ${formatMonthName(newDate.getMonth() + 1)} ${newDate.getDate()}`;
  };

  const combinedList = useMemo(() => {
    const letters = letterList.map((letter) => ({
      ...letter,
      type: 'letter' as const,
    }));
    const pets = petLetters.map((petLetter) => ({
      ...petLetter,
      type: 'petLetter' as const,
    }));

    return [...letters, ...pets].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [letterList, petLetters]);

  return (
    <section className={`${isCalendarMode ? 'pt-6' : ''} relative px-3 pb-7`}>
      <div
        className={`${isEditing && !isSelectLetterItem ? 'opacity-100' : 'opacity-0'} ${isCalendarMode ? 'top-[36px]' : 'top-[4px]'} absolute right-[73px] z-10 mb-2 rounded-[12px] border border-orange-400 bg-white px-3 py-2 text-center transition-opacity duration-300`}
      >
        <p className="text-[12px]">
          {t('letterBox.tooltipUpLine')} <br />
          {t('letterBox.tooltipDownLine')}
        </p>
        <div className="absolute left-1/2 top-[49px] size-2 -translate-x-1/2 rotate-[315deg] border-b border-l border-orange-400 bg-white"></div>
      </div>
      {isCalendarMode && (
        <div className="flex items-center justify-between">
          <h3 className="text-solo-large font-bold">{dateAndDay}</h3>
          <button
            disabled={!isExistTodayLetter}
            onClick={!isSelectLetterItem ? onClickEditButton : handleLocalModal}
            className={`${isSelectLetterItem ? 'border-[#FF0000] bg-[#ff0000]/[.25] text-[#FF0000]' : 'border-gray-1 text-gray-1'} rounded-[50px] border px-4 py-[4.5px] text-caption-pc leading-[12px]`}
          >
            {!isEditing
              ? t('letterBox.edit')
              : isSelectLetterItem
                ? t('letterBox.delete')
                : t('letterBox.cancel')}
          </button>
        </div>
      )}
      {isEditing ? (
        <ul className={isCalendarMode ? 'mt-5' : 'flex flex-col gap-1'}>
          {combinedList.map((item, index) => (
            <div key={`combined-item-${item.type}-${item.id}-${index}`}>
              {!isCalendarMode && (
                <p className="mb-3 text-[14px] font-bold text-[#616161]">
                  {listDate(item.createdAt)}
                </p>
              )}
              <div
                id={String(item.id)}
                onClick={() =>
                  item.type === 'letter' && handleLetterCheck(item.id)
                }
              >
                <LetterItem
                  letter={item.reply || null}
                  letterSummary={item.summary}
                  isSelect={selectedLetterList.includes(item.id)}
                  sequence={item.sequence || 0}
                  readLetterId={readLetterId}
                  id={item.id}
                  isReply={
                    item.type === 'letter'
                      ? item.letterStatus === 'RESPONSE'
                      : !item.readStatus
                  }
                  type={item.type}
                />
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <ul className={isCalendarMode ? 'mt-5' : 'flex flex-col gap-1'}>
          {combinedList.map((item, index) => (
            <div key={`combined-item-${item.type}-${item.id}-${index}`}>
              {!isCalendarMode && (
                <p
                  className={`${lng === 'en' ? 'text-[16px] text-[#424242]' : 'text-[14px] text-[#616161]'} mb-3 font-bold`}
                >
                  {listDate(item.createdAt)}
                </p>
              )}
              {item.type === 'letter' ? (
                <Link
                  to={`/letter-box/${item.id}`}
                  state={{ index: item.id }}
                  onClick={() => onLetterClick(item.id)}
                >
                  <LetterItem
                    letter={item.reply}
                    letterSummary={item.summary}
                    sequence={item.sequence}
                    readLetterId={readLetterId}
                    id={item.id}
                    isReply={item.letterStatus === 'RESPONSE' || false}
                    type={item.type}
                  />
                </Link>
              ) : (
                <Link
                  to={`/letter-box/pre/${item.id}`}
                  state={{ index: item.id }}
                  onClick={() => onLetterClick(item.id)}
                >
                  <LetterItem
                    letter={item.reply || null}
                    letterSummary={item.summary}
                    sequence={item.sequence || 0}
                    readLetterId={readLetterId}
                    id={item.id}
                    isReply={!item.readStatus}
                    type={item.type}
                  />
                </Link>
              )}
            </div>
          ))}
        </ul>
      )}
      {isToday && isCalendarMode && (
        <Button
          onClick={onClickWriteLetterButton}
          className="mt-5 flex h-auto items-center justify-center gap-x-2 rounded-2xl border border-dashed border-orange-400 bg-white py-5"
        >
          <img src={Plus} alt="add" />
          <span className="pt-px text-[18px] font-bold leading-[18px] text-orange-400">
            {t('letterBox.writeLetter')}
          </span>
        </Button>
      )}
      {!isCalendarMode && combinedList.length > 0 && (
        <div>
          <div
            onClick={onClickTopScroll}
            className="relative z-20 mx-auto mb-2 mt-1 size-10 cursor-pointer rounded-[8px] border border-[#BDBDBD] bg-[#F9F9F9] p-2"
          >
            <img src={Top} alt="top" loading="lazy" />
          </div>
          <p className="text-center text-[12px] leading-[12px] text-[#616161]">
            {t('letterBox.backToTop')}
          </p>
        </div>
      )}
      {lng === 'ko' && (
        <>
          <iframe
            src="https://ads-partners.coupang.com/widgets.html?id=794420&template=carousel&trackingCode=AF8807113&subId=&width=390&height=100&tsource="
            width="360"
            height="100"
            className="mt-6"
          />
          <div className="mt-4 flex items-start gap-[6.5px]">
            <img src={Info} alt="인포 아이콘" />
            <p className="text-[12px] font-[300] text-[#424242]">
              이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의
              수수료를 제공받습니다.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
