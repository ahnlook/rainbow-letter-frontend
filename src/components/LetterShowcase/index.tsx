import { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

import useIsWebview from 'hooks/useIsWebview';
import { getSharedLetterByMe } from 'api/user';
import {
  getSharedLetterList,
  getSampleSharedLetterList,
} from 'api/shared-letter';
import { SHOWCASE_LETTERS_FOR_EN } from './constants';
import SharedLetterItem from './SharedLetterItem';
import { SharedLetterItemType } from 'types/letters';
import LetterItem from './LetterItem';
import { getToken } from 'utils/localStorage';
import { useNavigate } from 'react-router-dom';

const LETTERS_PER_PAGE = 4;

const SHOWCASE_CAROUSEL_OPTIONS = {
  swipeToSlide: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 6000,
  slidesToShow: 2,
  slidesToScroll: 1,
  className: 'center',
  centerMode: true,
  centerPadding: '30px',
  speed: 500,
} as const;

function LetterShowcase() {
  const isWebview = useIsWebview();
  const navigate = useNavigate();
  const { t } = useTranslation<'translation'>();
  const { lng } = useSelector((state: RootState) => state.common);
  const [letters, setLetters] = useState<SharedLetterItemType[]>([]);
  const sliderRef = useRef<Slider>(null);

  const getSharedLetterDate = () => {
    const now = new Date();
    const fixedToday = new Date(now);
    fixedToday.setHours(10, 0, 0, 0);

    if (now < fixedToday) {
      fixedToday.setDate(fixedToday.getDate() - 1);
    }

    const twoDaysAgo = new Date(fixedToday);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    return {
      twoDaysAgo: twoDaysAgo.toISOString().split('.')[0],
      today: fixedToday.toISOString().split('.')[0],
    };
  };

  const fetchLetters = async () => {
    try {
      const { twoDaysAgo, today } = getSharedLetterDate();
      const token = getToken();

      let myLetters = { sharedLetters: [] };
      if (token) {
        myLetters = await getSharedLetterByMe(twoDaysAgo, today);

        if (myLetters.sharedLetters.length >= LETTERS_PER_PAGE) {
          setLetters(myLetters.sharedLetters.slice(0, LETTERS_PER_PAGE));
          setTimeout(() => {
            sliderRef.current?.slickNext();
          }, 50);
          return;
        }
      }

      // 다른 사람 편지 목록
      const remainingCount = LETTERS_PER_PAGE - myLetters.sharedLetters.length;
      const othersLetters = await getSharedLetterList(
        undefined,
        remainingCount,
        twoDaysAgo,
        today,
        true
      );

      const combinedLetters = [
        ...myLetters.sharedLetters,
        ...othersLetters.sharedLetters,
      ];

      if (combinedLetters.length >= LETTERS_PER_PAGE) {
        setLetters(combinedLetters.slice(0, LETTERS_PER_PAGE));
        setTimeout(() => {
          sliderRef.current?.slickNext();
        }, 50);
        return;
      }

      // 샘플 편지 목록
      const sampleLetters = await getSampleSharedLetterList();
      const finalLetters = [
        ...combinedLetters,
        ...sampleLetters.sharedLetters.slice(
          0,
          LETTERS_PER_PAGE - combinedLetters.length
        ),
      ];

      setLetters(finalLetters.slice(0, LETTERS_PER_PAGE));
      setTimeout(() => {
        sliderRef.current?.slickNext();
      }, 50);
    } catch (error) {
      console.warn(error);
    }
  };

  const onClickMoreButton = () => {
    navigate('/letters/letter-showcase');
  };

  useEffect(() => {
    fetchLetters();
  }, []);

  return (
    <section className={`${!isWebview && 'pl-5'} pt-5`}>
      <div className="flex items-center justify-between">
        <span className="text-solo-large font-bold">
          {t('home.letterPostedRainbow')}
        </span>
        <span
          onClick={onClickMoreButton}
          className="mr-[18px] cursor-pointer rounded-[50px] border border-[#BDBDBD] px-3 py-[4.5px] text-caption-pc leading-[12px] text-[#616161]"
        >
          더보기
        </span>
      </div>
      <div className="h-3" />
      <Slider ref={sliderRef} {...SHOWCASE_CAROUSEL_OPTIONS} className="h-52">
        {lng === 'en'
          ? SHOWCASE_LETTERS_FOR_EN.map((letter) => (
              <div className="w-[138px] px-1 py-5" key={letter.id}>
                <LetterItem letter={letter} />
              </div>
            ))
          : letters?.map((letter) => (
              <div className="w-[138px] px-1 py-5" key={letter.id}>
                <SharedLetterItem letter={letter} />
              </div>
            ))}
      </Slider>
    </section>
  );
}

export default LetterShowcase;
