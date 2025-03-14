import { useState, useEffect, useMemo, useCallback } from 'react';
import { format, subDays, addDays, startOfMonth, endOfMonth } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store';
import WeekCalendar from './WeekCalendar';
import LetterList from './LetterList';
import { LetterListResponse } from 'types/letters';
import { PetResponse } from 'types/pets';
import Left from '../../assets/ic_letterBox_left.svg';
import Right from '../../assets/ic_letterBox_right.svg';
import DropDown from '../../assets/ic_letterBox_dropdown.svg';
import { formatMonthName } from 'utils/date';
import useCalendar from 'hooks/useCalendar';
import letterSlice from 'store/letter/letter-slice';
import { ReactComponent as Calendar } from 'assets/ic_letterBox_calendar.svg';
import { ReactComponent as List } from 'assets/ic_letterBox_list.svg';
import { getLetterList } from 'api/letter';
import { getListViewTooltip, setListViewTooltip } from 'utils/localStorage';
import Modal from 'components/Modal';
import DeleteModal from './DeletModal';
import { deleteLetter } from 'api/letter';
import BottomSheet from 'components/Common/BottomSheet';
import CalendarController from './CalendarController';
import UntilTimeBox from './UntilTimeBox';
import { getLetterListByPet } from 'api/pets';
import { useLocation } from 'react-router-dom';

type Props = {
  setIsEditing: (bool: boolean) => void;
  selectedPet: PetResponse | null;
  isEditing: boolean;
};

export default function LetterListRenew({
  setIsEditing,
  selectedPet,
  isEditing,
}: Props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation<'translation'>();
  const { lng } = useSelector((state: RootState) => state.common);
  const { letterBoxState } = useSelector((state: RootState) => state.letter);

  const { currentDate, setCurrentDate, weekCalendarList } = useCalendar();

  const shouldRestoreState =
    location.key !== 'default' && letterBoxState.isExistState;

  const [letterList, setLetterList] = useState<LetterListResponse[]>(
    shouldRestoreState ? letterBoxState.letterList : []
  );
  const [isCalendarMode, setIsCalendarMode] = useState<boolean>(
    shouldRestoreState ? letterBoxState.isCalendarMode : true
  );
  const [isToolTipOpen, setIsToolTipOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetShow, setIsBottomSheetShow] = useState<boolean>(false);
  const [selectedLetterList, setSelectedLetterList] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [readLetterId, setReadLetterId] = useState<number[]>([]);

  const today = new Date();

  const findWeeks = () => {
    const findIndex = weekCalendarList.findIndex((weeks: string[]) =>
      weeks.includes(format(currentDate, 'yyyy-MM-dd'))
    );

    return weekCalendarList[findIndex];
  };

  const fetchLetters = async (isInitial: boolean = false) => {
    if (!selectedPet?.id || isLoading || (!hasMore && !isInitial)) return;

    try {
      setIsLoading(true);

      const lastId = isInitial
        ? undefined
        : letterList[letterList.length - 1]?.id;
      const weeks = findWeeks();

      const startDate = isCalendarMode
        ? format(new Date(weeks[0]), 'yyyy-MM-dd HH:mm:ss.SSS')
        : format(startOfMonth(currentDate), 'yyyy-MM-dd HH:mm:ss.SSS');
      const endDate = isCalendarMode
        ? format(new Date(weeks[weeks.length - 1]), 'yyyy-MM-dd HH:mm:ss.SSS')
        : format(endOfMonth(currentDate), 'yyyy-MM-dd HH:mm:ss.SSS');

      const { letters } = await getLetterListByPet(
        selectedPet.id,
        lastId,
        isCalendarMode ? 1000 : 5,
        startDate,
        endDate
      );

      if (!shouldRestoreState) {
        if (isInitial) {
          setLetterList(letters || []);
        } else {
          setLetterList((prev) => [...prev, ...(letters || [])]);
        }
      } else {
        dispatch(
          letterSlice.actions.setLetterBoxState({
            ...letterBoxState,
            isExistState: false,
          })
        );
      }

      setHasMore(letters?.length === 5);
    } catch (error) {
      console.error('Failed to fetch letters:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (shouldRestoreState && letterBoxState.scroll) {
      const date = new Date(letterBoxState.currentDate);
      window.scrollTo(0, letterBoxState.scroll);
      setCurrentDate(date);
    }
  }, [shouldRestoreState, letterBoxState.scroll]);

  useEffect(() => {
    const readLetterIdArr = letterList
      .filter(
        (letter: LetterListResponse) => letter.reply?.readStatus === 'READ'
      )
      .map((item: LetterListResponse) => item.id);
    const readLetterIds = [...readLetterIdArr, ...letterBoxState.readLetterIds];
    const filterArr = [...new Set(readLetterIds)];

    setReadLetterId(filterArr);
  }, [letterList]);

  const handleScroll = useCallback(() => {
    if (isCalendarMode || isLoading || !hasMore) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 150) {
      fetchLetters(false);
    }
  }, [isCalendarMode, isLoading, hasMore]);

  // 인피니티 스크롤 시, 스크롤 감지
  useEffect(() => {
    if (!isCalendarMode) {
      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isCalendarMode, handleScroll, currentDate]);

  useEffect(() => {
    // 리스트뷰 안내 툴팁 체크
    const isOpen = getListViewTooltip();
    if (isOpen === null) {
      setIsToolTipOpen(true);
    }

    fetchLetters(true);

    if (!isCalendarMode) {
      setHasMore(true);
    }
  }, [isCalendarMode, currentDate]);

  useEffect(() => {
    if (!isEditing) {
      setSelectedLetterList([]);
    }
  }, [isEditing]);

  const mappedLetterListByDate = letterList.map((letter) =>
    format(letter.createdAt.split('T')[0], 'yyyy-MM-dd')
  );

  const yearAndMonth = useMemo(() => {
    if (lng === 'ko') {
      return `${currentDate.getMonth() + 1}월`;
    }
    return `${formatMonthName(currentDate.getMonth() + 1)}`;
  }, [lng, currentDate]);

  const onClickPrevWeek = useCallback(() => {
    setCurrentDate(subDays(currentDate, 7));
    setIsEditing(false);
  }, [currentDate]);

  const onClickNextWeek = useCallback(() => {
    setCurrentDate(addDays(currentDate, 7));
    setIsEditing(false);
  }, [currentDate]);

  const onClickMonthCalendar = useCallback(() => {
    const action = letterSlice.actions.setCalendarOpen();
    dispatch(action);
    setIsEditing(false);
  }, [dispatch]);

  const handleStandardDate = () => {
    setCurrentDate(new Date());
  };

  const handleMode = (bool: boolean) => {
    setIsEditing(false);
    dispatch(letterSlice.actions.clearLetterBoxState());
    window.scrollTo(0, 0);

    if (!isToolTipOpen) {
      setIsCalendarMode(bool);
      return;
    }

    setListViewTooltip();
    setIsToolTipOpen(false);
    setIsCalendarMode(bool);
  };

  const handleBottomSheetShow = useCallback(() => {
    setIsBottomSheetShow((prev) => !prev);
  }, []);

  const onClickEditButton = () => {
    setIsEditing(!isEditing);
  };

  const handleLocalModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const handleLetterCheck = (id: number) => {
    if (selectedLetterList.includes(id)) {
      return setSelectedLetterList(
        selectedLetterList.filter((item) => item !== id)
      );
    }

    return setSelectedLetterList((prev) => [...prev, id]);
  };

  const onClickDeleteButton = async () => {
    try {
      for (const letter of selectedLetterList) {
        await deleteLetter(letter);
      }
    } catch (error) {
      console.log(error);
    } finally {
      const {
        data: { letters },
      } = await getLetterList(selectedPet?.id);
      setLetterList(letters || []);
      setSelectedLetterList([]);
      handleLocalModal();
      onClickEditButton();
    }
  };

  const isSelectLetterItem = selectedLetterList.length > 0;
  const isExistTodayLetter = letterList.length > 0;

  const checkCorrectMonth = () => {
    return format(today, 'MM') === format(currentDate, 'MM');
  };
  const checkCorrectDate = () => {
    return format(today, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd');
  };
  const disabledStyle = () => {
    if (isCalendarMode) {
      return checkCorrectDate() ? 'opacity-50' : '';
    }

    return checkCorrectMonth() ? 'opacity-50' : '';
  };

  const onLetterClick = (letterId: number) => {
    const copyReadLetterId: number[] = [...letterBoxState.readLetterIds];
    copyReadLetterId.push(letterId);
    setReadLetterId((prev) => [...prev, letterId]);

    const state = {
      isExistState: true,
      isCalendarMode,
      currentDate: currentDate.toISOString(),
      letterList,
      scroll: window.scrollY,
      readLetterIds: copyReadLetterId,
    };

    dispatch(letterSlice.actions.setLetterBoxState(state));
  };

  const filteredLetter = isCalendarMode
    ? letterList.filter(
        (letter) =>
          format(letter.createdAt.split('T')[0], 'yyyy-MM-dd') ===
          format(currentDate, 'yyyy-MM-dd')
      )
    : letterList;

  return (
    <section>
      {lng === 'en' && (
        <div className="px-4 pt-6">
          <UntilTimeBox />
        </div>
      )}

      <div
        className={`${lng === 'en' ? 'pt-4' : 'pt-8'} relative flex justify-between px-4 pb-5`}
      >
        {isToolTipOpen && (
          <div
            className={`${isToolTipOpen ? 'opacity-100' : 'opacity-0'} ${lng === 'en' ? '-top-[50px]' : '-top-[36px]'} absolute left-4 z-10 mb-2 rounded-[12px] border border-orange-400 bg-white px-3 pb-2 pt-3 text-center transition-opacity duration-300`}
          >
            <p className="text-[12px] leading-[16px]">
              {t('letterBox.tooltipListViewUpLine')} <br />
              {t('letterBox.tooltipListViewDownLine')}
            </p>
            <div className="absolute left-7 top-[49px] size-2 -translate-x-1/2 rotate-[315deg] border-b border-l border-orange-400 bg-white"></div>
          </div>
        )}
        <div className="flex gap-2">
          <div onClick={() => handleMode(true)} className="cursor-pointer">
            <Calendar stroke={isCalendarMode ? '#FFB74D' : '#BDBDBD'} />
          </div>
          <div onClick={() => handleMode(false)} className="cursor-pointer">
            <List stroke={isCalendarMode ? '#BDBDBD' : '#FFB74D'} />
          </div>
        </div>
        <button
          type="button"
          onClick={
            isCalendarMode ? onClickMonthCalendar : handleBottomSheetShow
          }
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5"
        >
          <p className="text-[1.125rem] font-bold">{yearAndMonth}</p>
          <img src={DropDown} alt="dropdown" />
        </button>
        <div className="flex items-center">
          <button
            disabled={isCalendarMode ? checkCorrectDate() : checkCorrectMonth()}
            onClick={handleStandardDate}
            className="mr-2 rounded-[50px] border border-[#BDBDBD] px-2 py-1"
          >
            <p
              className={`${disabledStyle()} text-[12px] font-[500] leading-[12px] text-[#616161]`}
            >
              {isCalendarMode ? t('letterBox.today') : t('letterBox.thisMonth')}
            </p>
          </button>
          {isCalendarMode ? (
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClickPrevWeek}
                className="flex items-center gap-1.5 p-2.5"
              >
                <img src={Left} alt="left" />
              </button>
              <button
                type="button"
                onClick={onClickNextWeek}
                className="flex items-center gap-1.5 p-2.5"
              >
                <img src={Right} alt="right" />
              </button>
            </div>
          ) : (
            <button
              disabled={!isExistTodayLetter}
              onClick={
                !isSelectLetterItem ? onClickEditButton : handleLocalModal
              }
              className={`${isSelectLetterItem ? 'border-[#FF0000] bg-[#ff0000]/[.25] text-[#FF0000]' : 'border-gray-1 text-gray-1'} rounded-[50px] border px-2 py-[4.5px] text-caption-pc leading-[12px]`}
            >
              {!isEditing
                ? t('letterBox.edit')
                : isSelectLetterItem
                  ? t('letterBox.delete')
                  : t('letterBox.cancel')}
            </button>
          )}
        </div>
      </div>
      {isCalendarMode && (
        <WeekCalendar
          letterList={mappedLetterListByDate}
          selectedPet={selectedPet}
          setIsEditing={setIsEditing}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          weekCalendarList={weekCalendarList}
        />
      )}
      <LetterList
        date={currentDate}
        selectedPet={selectedPet}
        isEditing={isEditing}
        isCalendarMode={isCalendarMode}
        isSelectLetterItem={isSelectLetterItem}
        isExistTodayLetter={isExistTodayLetter}
        onClickEditButton={onClickEditButton}
        handleLocalModal={handleLocalModal}
        letterList={filteredLetter}
        handleLetterCheck={handleLetterCheck}
        selectedLetterList={selectedLetterList}
        onLetterClick={onLetterClick}
        readLetterId={readLetterId}
      />

      {isModalOpen && (
        <Modal
          isLocalOpen={isModalOpen}
          localModalContents={
            <DeleteModal
              setIsModalOpen={setIsModalOpen}
              onClickDeleteButton={onClickDeleteButton}
            />
          }
        />
      )}
      <BottomSheet
        isShow={isBottomSheetShow}
        handlePetsListShow={handleBottomSheetShow}
        contents={
          <CalendarController
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            handlePetsListShow={handleBottomSheetShow}
          />
        }
      />
    </section>
  );
}
