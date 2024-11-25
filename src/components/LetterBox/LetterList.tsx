import { useState, useEffect, useMemo, useCallback } from 'react';
import { format, getDay } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from 'store';
import Modal from 'components/Modal';
import LetterItem from 'components/LetterBox/LetterItem';
import Button from 'components/Button';
import { LetterListResponse } from 'types/letters';
import { PetResponse } from 'types/pets';
import { formatDay } from 'utils/date';
import { getLetterList, deleteLetter } from 'api/letter';
import Plus from '../../assets/ic_letterBox_plus.svg';
import Info from '../../assets/ic_letterBox_info.svg';
import DeleteModal from './DeletModal';

type Props = {
  date: Date;
  selectedPet: PetResponse | null;
  letterList: LetterListResponse[];
  isEditing: boolean;
  setIsEditing: any;
  setLetterList: (date: LetterListResponse[]) => void;
};

export default function LetterList({
  date,
  selectedPet,
  letterList,
  setIsEditing,
  isEditing,
  setLetterList,
}: Props) {
  const navigate = useNavigate();
  const { isCalendarOpen } = useSelector((state: RootState) => state.letter);
  const [selectedLetterList, setSelectedLetterList] = useState<number[]>([]);
  const [filteredLetterList, setFilteredLetterList] = useState<
    LetterListResponse[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const filteredListByPet = letterList.filter(
      (letter) => letter.petName === selectedPet?.name
    );

    setFilteredLetterList(filteredListByPet || []);
  }, [selectedPet, letterList, isCalendarOpen]);

  useEffect(() => {
    if (isCalendarOpen) {
      setFilteredLetterList([]);
    }
  }, [isCalendarOpen]);

  useEffect(() => {
    if (!isEditing) {
      setSelectedLetterList([]);
    }
  }, [isEditing]);

  const filteredListByDate = filteredLetterList.filter(
    (letter) =>
      format(letter.createdAt, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
  );

  const localDate = useMemo(() => {
    const utcDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );
    return utcDate;
  }, [date]);

  const formattedDay = formatDay(getDay(localDate));
  const dateAndDay = `${format(localDate, 'M월 dd일')} ${formattedDay}요일`;

  const isToday = useMemo(() => {
    const today = format(new Date(), 'yyyy-MM-dd');

    return today === format(date, 'yyyy-MM-dd');
  }, [date]);

  const onClickWriteLetterButton = useCallback(() => {
    navigate('/write-letter', { state: selectedPet?.id });
  }, [selectedPet?.id]);

  const onClickEditButton = () => {
    setIsEditing(!isEditing);
  };

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
      setIsModalOpen(false);
      setIsEditing(false);
    }
  };

  const handleLocalModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const isSelectLetterItem = selectedLetterList.length > 0;
  const isExistTodayLetter = filteredListByDate.length > 0;

  return (
    <section className="relative px-3 pb-7 pt-6">
      <div
        className={`${isEditing && !isSelectLetterItem ? 'opacity-100' : 'opacity-0'} absolute right-[73px] top-[36px] z-10 mb-2 rounded-[12px] border border-orange-400 bg-white px-3 py-2 text-center transition-opacity duration-300`}
      >
        <p className="text-[12px]">
          아래 편지를 눌러 <br />
          삭제할 편지를 선택할 수 있어요!
        </p>
        <div className="absolute left-1/2 top-[49px] size-2 -translate-x-1/2 rotate-[315deg] border-b border-l border-orange-400 bg-white"></div>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-solo-large font-bold">{dateAndDay}</h3>
        <button
          disabled={!isExistTodayLetter}
          onClick={!isSelectLetterItem ? onClickEditButton : handleLocalModal}
          className={`${isSelectLetterItem ? 'border-[#FF0000] bg-[#ff0000]/[.25] text-[#FF0000]' : 'border-gray-1 text-gray-1'} rounded-[50px] border px-4 py-[4.5px] text-caption-pc leading-[12px]`}
        >
          {!isEditing ? '편집' : isSelectLetterItem ? '삭제' : '취소'}
        </button>
      </div>
      {isEditing ? (
        <ul className="mt-5">
          {filteredListByDate.map((letter) => (
            <div
              id={String(letter.id)}
              onClick={() => handleLetterCheck(letter.id)}
              key={`letter-item-edit-${letter.id}`}
            >
              <LetterItem
                letter={letter}
                isSelect={selectedLetterList.includes(letter.id)}
              />
            </div>
          ))}
        </ul>
      ) : (
        <ul className="mt-5">
          {filteredListByDate.map((letter) => (
            <Link
              to={`/letter-box/${letter.id}`}
              key={`letter-item-${letter.id}`}
              state={{ index: letter.number }}
            >
              <LetterItem letter={letter} />
            </Link>
          ))}
        </ul>
      )}
      {isToday && (
        <Button
          onClick={onClickWriteLetterButton}
          className="mt-5 flex h-auto items-center justify-center gap-x-2 rounded-2xl border border-dashed border-orange-400 bg-white py-5"
        >
          <img src={Plus} alt="add" />
          <span className="pt-px text-[18px] font-bold leading-[18px] text-orange-400">
            편지쓰기
          </span>
        </Button>
      )}
      <iframe
        src="https://ads-partners.coupang.com/widgets.html?id=794420&template=carousel&trackingCode=AF8807113&subId=&width=390&height=100&tsource="
        width="360"
        height="100"
        className="mt-6"
      />
      <div className="mt-4 flex items-start gap-[6.5px]">
        <img src={Info} alt="인포 아이콘" />
        <p className="text-[12px] font-[300] text-[#424242]">
          이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
          제공받습니다.
        </p>
      </div>
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
    </section>
  );
}
