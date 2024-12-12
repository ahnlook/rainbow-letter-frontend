import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';

import LetterItem from 'components/LetterShowcase/LetterItem';
import { ShowcaseLetter } from './type';
import useIsWebview from 'hooks/useIsWebview';
import { T } from 'types/translate';
import { SHOWCASE_LETTERS_FOR_EN } from './constants';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const SHOWCASE_CAROUSEL_OPTIONS = {
  swipeToSlide: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 10000,
  slidesToShow: 2,
  slidesToScroll: 1,
  className: 'center',
  centerMode: true,
  centerPadding: '30px',
  speed: 500,
} as const;

function LetterShowcase() {
  const isWebview = useIsWebview();
  const { t }: T = useTranslation();
  const { lng } = useSelector((state: RootState) => state.common);
  const [letters, setLetters] = useState<ShowcaseLetter[]>();

  useEffect(() => {
    if (lng === 'ko') {
      fetch('/showcaseLetters.json')
        .then((response) => response.json())
        .then((data) => {
          const filteredData = data.slice(1);
          setLetters(filteredData);
        })
        .catch((error) => console.error('Error fetching data:', error));
    } else {
      setLetters(SHOWCASE_LETTERS_FOR_EN);
    }
  }, [lng]);

  return (
    <section className={`${!isWebview && 'pl-5'} pt-8`}>
      <span className="pb-8 pt-5 text-solo-large font-bold">
        {t('home.letterPostedRainbow')}
      </span>
      <div className="h-6" />
      <Slider {...SHOWCASE_CAROUSEL_OPTIONS} className="h-52">
        {letters?.map((letter) => (
          <div className="w-[138px] px-1 py-5" key={letter.id}>
            <LetterItem letter={letter} />
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default LetterShowcase;
