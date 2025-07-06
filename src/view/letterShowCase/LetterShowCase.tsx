import HomeDivider from 'components/Home/Divider';
import AppBar from 'components/AppBar';
import Main from '../../assets/im_showCase_main.webp';
import LetterPostButton from 'components/LetterPostButton';
import { useState, useEffect, useCallback } from 'react';
import { SharedLetterItemType } from 'types/letters';
import SharedLetterItem from 'components/LetterShowcase/SharedLetterItem';
import {
  getSampleSharedLetterList,
  getSharedLetterList,
} from 'api/shared-letter';
import NavBar from 'components/NavBar';
import Top from '../../assets/ic_letterBox_top.svg';
import { getSharedLetterByMe } from 'api/user';
import {
  format,
  subDays,
  setSeconds,
  setMinutes,
  setHours,
  isBefore,
} from 'date-fns';
import { getToken } from 'utils/localStorage';

const LETTERS_PER_PAGE = 4;

export default function LetterShowCase() {
  const [sharedLetterList, setSharedLetterList] = useState<
    SharedLetterItemType[]
  >([]);
  const [sharedLetterListByMe, setSharedLetterListByMe] = useState<
    SharedLetterItemType[]
  >([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchSharedLetter(true);
  }, []);

  const getSharedLetterDate = () => {
    const now = new Date();
    let fixedToday = setSeconds(setMinutes(setHours(now, 10), 0), 0);

    if (isBefore(now, fixedToday)) {
      fixedToday = subDays(fixedToday, 1);
    }

    const twoDaysAgo = subDays(fixedToday, 2);

    return {
      twoDaysAgo: twoDaysAgo.toISOString().split('.')[0],
      today: fixedToday.toISOString().split('.')[0],
    };
  };

  const fetchMySharedLetter = async (token: string | null) => {
    if (!token) return 0;

    const { twoDaysAgo, today } = getSharedLetterDate();
    const mySharedLetterList = await getSharedLetterByMe(twoDaysAgo, today);
    const letters = mySharedLetterList ?? [];
    setSharedLetterListByMe(letters);
    return letters.length;
  };

  const fetchAllSharedLetter = async (
    isInitial: boolean,
    myLettersCount: number
  ) => {
    const token = getToken();
    if (!token) return 0;

    const { twoDaysAgo, today } = getSharedLetterDate();
    const lastId = isInitial
      ? undefined
      : sharedLetterList[sharedLetterList.length - 1]?.id;

    const remainingCount = LETTERS_PER_PAGE - myLettersCount;
    if (remainingCount > 0 || !isInitial) {
      const allSharedLetter = await getSharedLetterList(
        lastId,
        isInitial ? remainingCount : LETTERS_PER_PAGE,
        twoDaysAgo,
        today
      );

      const letters = Array.isArray(allSharedLetter) ? allSharedLetter : [];

      if (isInitial) {
        setSharedLetterList(letters);
      } else {
        setSharedLetterList((prev) => [...prev, ...letters]);
      }

      setHasMore(letters.length === LETTERS_PER_PAGE);

      if (isInitial && myLettersCount + letters.length < LETTERS_PER_PAGE) {
        const sampleSharedLetter = await getSampleSharedLetterList();
        setSharedLetterList((prev) => [...prev, ...sampleSharedLetter]);
        setHasMore(false);
      }

      return letters.length;
    }
    return 0;
  };

  const fetchSharedLetter = async (isInitial: boolean = false) => {
    try {
      setIsLoading(true);
      const token = getToken();

      if (!token) {
        // 토큰이 없을 경우 샘플 편지만 표시
        const sampleSharedLetter = await getSampleSharedLetterList();
        setSharedLetterList(sampleSharedLetter ?? []);
        setSharedLetterListByMe([]);
        setHasMore(false);
        return;
      }

      let totalLetters = 0;

      if (isInitial) {
        const myLettersCount = await fetchMySharedLetter(token);
        totalLetters += myLettersCount;

        if (totalLetters < LETTERS_PER_PAGE) {
          const othersLettersCount = await fetchAllSharedLetter(
            isInitial,
            myLettersCount
          );
          totalLetters += othersLettersCount;
        } else {
          setHasMore(true);
        }
      } else {
        await fetchAllSharedLetter(isInitial, sharedLetterListByMe.length);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 150) {
      fetchSharedLetter(false);
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const onClickTopScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const list = [...sharedLetterListByMe, ...sharedLetterList];
  const { today } = getSharedLetterDate();
  const myLetterIds = sharedLetterListByMe.map((letter) => letter.id);

  return (
    <section className="pb-36">
      <AppBar />
      <HomeDivider />
      <div className="px-[18px]">
        <img src={Main} alt="image" loading="lazy" className="mt-[30px]" />
        <div className="mt-4 flex flex-col gap-3">
          <p className="text-[18px] font-bold leading-[18px] tracking-[-0.72px]">
            매일 오전 10시에 편지가 걸려요!
          </p>
          <p className="text-[14px] leading-[21px] tracking-[-0.56px] text-[#616161]">
            가장 힘이 되었던 말을 공유하여 무지개 가족들과 마음을 나눠보세요.
            제출한 편지는 2일 동안 걸려 있어요.
          </p>
        </div>
        <div className="mt-6">
          <LetterPostButton />
        </div>
        <p className="mb-[30px] text-center text-xs text-[#BDBDBD]">
          업데이트 날짜 : {format(today, `yyyy년 MM월 dd일 오전 10시`)}
        </p>
        <div className="flex w-full items-center justify-center">
          <ul className="grid grid-cols-2 gap-6">
            {list.map((letter, index) => (
              <li key={`shared-${letter.id}-${index}`} className="w-[138px]">
                <SharedLetterItem
                  letter={letter}
                  isMine={myLetterIds.includes(letter.id)}
                />
              </li>
            ))}
          </ul>
        </div>
        {sharedLetterList.length > 0 && (
          <div className="mt-8 flex w-full justify-center">
            <div
              onClick={onClickTopScroll}
              className="z-20 size-10 cursor-pointer rounded-[8px] bg-[#F9F9F9] p-2"
            >
              <img src={Top} alt="top" loading="lazy" />
            </div>
          </div>
        )}
      </div>
      <NavBar />
    </section>
  );
}
