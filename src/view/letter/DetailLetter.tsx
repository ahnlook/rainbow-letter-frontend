import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from 'components/Button';
import WrittenLetterPaper from 'components/Write/WrittenLetterPaper';
import LetterPaperWithImage from 'components/Write/LetterPaperWithImage';
import SentPhoto from 'components/LetterBox/SentPhoto';
import { USER_ACTIONS } from 'components/LetterBox/constants';
import CoverImageWithTimeStamp from 'components/Common/CoverImageWithTimeStamp';
import DownLoadButton from 'components/Write/DownLoadButton';
import { RootState, useAppDispatch } from 'store';
import { getLetter } from 'api/letter';
import metaData from 'utils/metaData';
import {
  formatDateIncludingHangul,
  formatDateIncludingEnglish,
} from 'utils/date';
import { isiPhone } from 'utils/device';
import { modalActions } from 'store/modal/modal-slice';
import { letterActions } from 'store/letter/letter-slice';
import { readReply } from '../../api/reply';
import captureLogo from '../../assets/detailLetter_logo.svg';
import { toolTipActions } from 'store/toolTip/toolTip-slice';
import { getFirstReplyUser } from 'utils/localStorage';
import { getImage } from 'api/images';
import LetterIcon from '../../assets/letter-icon.svg';
import PetIcon from '../../assets/ic_letter_pet.svg';
import { postData } from 'api/data';

export default function DetailLetter() {
  // redux
  const dispatch = useAppDispatch();
  const { t } = useTranslation<'translation'>();
  const { lng } = useSelector((state: RootState) => state.common);
  const { isOpen } = useSelector((state: RootState) => state.toolTip);

  // ref
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<Slider>(null);

  // state
  const [letterData, setLetterData] = useState<any>();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // etc.
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      metaData(Object.keys(params)[0]);
      const { data } = await getLetter(params.letterId);
      setLetterData(data);
      if (data.reply?.status === 'REPLY') {
        await readReply(data.reply.id);
        const isNotFirst = getFirstReplyUser();
        if (!isNotFirst) {
          dispatch(toolTipActions.openToolTip());
        }
        const isSlideModal = localStorage.getItem('slideModal');
        if (!isSlideModal) {
          localStorage.setItem('slideModal', 'true');
          dispatch(modalActions.openModal('SLIDE'));
        }
      }
    })();
  }, []);

  const onClickReplyButton = () => {
    navigate('/write-letter', { state: letterData?.pet.id });
  };

  const handleSaveToImage = useCallback(
    async (type: string) => {
      const isIphone = isiPhone();
      let fileDate: string | null | undefined;
      let cate: string | null | undefined = '편지';
      if (sectionRef.current) {
        html2canvas(sectionRef.current, {
          allowTaint: false,
          useCORS: true,
          scale: 4,
          onclone: (document) => {
            const letterBox = document.querySelector(
              '.letterBox'
            ) as HTMLElement;
            const button = document.querySelector('.not-btn') as HTMLElement;
            const saveBtn = document.querySelector('.not-save') as HTMLElement;
            const sentPhoto = document.querySelector('.not-img') as HTMLElement;
            const logo = document.querySelector('.logo') as HTMLElement;
            const slideBtn = document.querySelector(
              '.slide-btn'
            ) as HTMLElement;

            const textarea = document.querySelector(
              `${type === 'image_reply' ? '.reply_value' : '.letter_value'}`
            ) as HTMLTextAreaElement;
            const unSelectedLetter = document.querySelector(
              `${type === 'image_letter' ? '.reply_down' : '.letter_down'}`
            ) as HTMLElement;
            const date = document.querySelector(
              `${type === 'image_reply' ? '.reply_date' : '.letter_date'}`
            ) as HTMLElement;

            if (type === 'image_reply') {
              cate = '답장';
            }

            if (letterBox) {
              letterBox.style.paddingTop = '15px';
              button.style.display = 'none';
              unSelectedLetter.style.display = 'none';
              saveBtn.style.display = 'none';
              slideBtn.style.display = 'none';

              const div = document.createElement('div');
              div.innerText = textarea.value;
              div.style.fontFamily = 'Gyobomungo2019';
              textarea.style.display = 'none';
              div.style.minHeight = '280px';
              textarea.parentElement?.append(div);
              textarea.parentElement?.append(date);
              const text = date.firstChild;
              fileDate = text?.textContent;
              logo.style.display = 'block';
              if (sentPhoto) {
                sentPhoto.style.display = 'none';
              }
              if (type === 'image_reply') {
                logo.style.position = 'absolute';
                logo.style.bottom = '4px';
                logo.style.left = '0px';
                letterBox.style.paddingBottom = '40px';
              }
              if (isIphone) {
                logo.style.position = 'absolute';
                logo.style.bottom = '4px';
                logo.style.left = '-30px';
                letterBox.style.paddingBottom = '42px';
                if (type === 'image_letter') {
                  letterBox.style.paddingBottom = '58px';
                }
              }
            }
          },
        })
          .then((canvas) => {
            const image = canvas.toDataURL('image/png');
            dispatch(letterActions.setSaveImageUrl(image));
            const link = document.createElement('a');
            link.download = `${fileDate}_${letterData?.pet.name} ${cate}`;
            if (!isIphone) {
              link.href = image;
              link.click();
            }
          })
          .then(async () => {
            await postData({
              event: type,
            });
            if (isIphone) {
              return navigate('/saved-image');
            }
            return dispatch(modalActions.openModal('SAVECOMPLETE'));
          });
      }
    },
    [letterData]
  );

  const onClickSaveIcon = useCallback(async () => {
    handleSaveToImage(currentSlide === 0 ? 'image_letter' : 'image_reply');
  }, [currentSlide]);

  const onToggleSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    setTimeout(() => {
      sliderRef.current?.slickGoTo(slideIndex);
    }, 100);
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const isExistReply = !!letterData?.reply?.content;

  const targetValueFromPet = useMemo(() => {
    if (lng === 'ko') {
      return `${letterData?.pet.name}로부터`;
    }

    return `From. ${letterData?.pet.name}`;
  }, [lng, letterData?.pet.name]);

  const targetValueToPet = useMemo(() => {
    if (lng === 'ko') {
      return `${letterData?.pet.name}에게`;
    }

    return `Dear. ${letterData?.pet.name}`;
  }, [lng, letterData?.pet.name]);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    adaptiveHeight: true,
    beforeChange: (current: number, next: number) => handleSlideChange(next),
  };

  return (
    <>
      {letterData && (
        <section className="letterBox relative" ref={sectionRef}>
          {isOpen && (
            <div
              className={`${isExistReply ? 'opacity-100' : 'opacity-0'} absolute -right-[10px] -top-[16px] z-50 rounded-[12px] border border-orange-400 bg-white px-3 py-2 text-center transition-opacity duration-300`}
            >
              <p className={`${lng === 'ko' ? 'pt-[3px]' : ''} text-[12px]`}>
                {t('inBox.saveUpLine')} <br />
                {t('inBox.saveDownLine')}
              </p>
              <div className="absolute -top-[5px] right-[18px] z-50 size-2 rotate-[315deg] border-r border-t border-orange-400 bg-white"></div>
            </div>
          )}

          <div className="slide-btn flex justify-between">
            <div className="flex gap-x-1 text-sm">
              <div
                onClick={() => onToggleSlide(0)}
                className={`${currentSlide === 0 ? 'border-black text-[#252525]' : 'border-transparent text-[#989898]'} flex cursor-pointer items-center gap-x-[2px] border-b px-3 py-2`}
              >
                <img
                  src={LetterIcon}
                  alt="letter"
                  className={
                    currentSlide === 0
                      ? 'brightness-0'
                      : 'opacity-40 brightness-0 saturate-0'
                  }
                />
                <span>내 편지</span>
              </div>
              {isExistReply && (
                <div
                  onClick={() => onToggleSlide(1)}
                  className={`${currentSlide === 1 ? 'border-black text-[#252525]' : 'border-transparent text-[#989898]'} flex cursor-pointer items-center gap-x-[2px] border-b px-3 py-2`}
                >
                  <img
                    src={PetIcon}
                    alt="pet"
                    className={
                      currentSlide === 1
                        ? 'brightness-0'
                        : 'opacity-40 brightness-0 saturate-0'
                    }
                  />
                  <span>아이 편지</span>
                </div>
              )}
            </div>
            <DownLoadButton onClick={onClickSaveIcon} />
          </div>

          <Slider ref={sliderRef} {...sliderSettings} className="mt-4">
            {/* 첫 번째 슬라이드: 내 편지 */}
            <div>
              <LetterPaperWithImage>
                <CoverImageWithTimeStamp
                  image={getImage(letterData?.pet.image)}
                />
                <WrittenLetterPaper
                  petName={targetValueToPet}
                  content={letterData.letter.content}
                  className="pt-[15.187rem]"
                  letterPaperColor="bg-gray-2"
                  date={
                    lng === 'ko'
                      ? formatDateIncludingHangul(letterData.letter.createdAt)
                      : formatDateIncludingEnglish(letterData.letter.createdAt)
                  }
                  saveType={{
                    target: 'letter_down',
                    unTargetValue: 'letter_value',
                    date: 'letter_date',
                  }}
                />
              </LetterPaperWithImage>
            </div>

            {/* 두 번째 슬라이드: 답장 (답장이 있는 경우에만) */}
            {isExistReply && (
              <div>
                <LetterPaperWithImage>
                  <CoverImageWithTimeStamp
                    image={getImage(letterData?.pet.image)}
                  />
                  <WrittenLetterPaper
                    petName={targetValueFromPet}
                    content={letterData.reply.content}
                    className="pt-[15.187rem]"
                    letterPaperColor="bg-orange-50"
                    date={
                      lng === 'ko'
                        ? formatDateIncludingHangul(letterData.letter.createdAt)
                        : formatDateIncludingEnglish(
                            letterData.letter.createdAt
                          )
                    }
                    saveType={{
                      target: 'reply_down',
                      unTargetValue: 'reply_value',
                      date: 'reply_date',
                    }}
                  />
                </LetterPaperWithImage>
              </div>
            )}
          </Slider>
          {letterData.letter.image && <SentPhoto letterData={letterData} />}
          <div className="w-full">
            <img src={captureLogo} alt="로고" className="logo hidden" />
          </div>
          <Button
            id="reply_write"
            disabled={!letterData?.reply?.content}
            onClick={onClickReplyButton}
            className="not-btn mt-12"
          >
            {t(USER_ACTIONS.GO_TO_REPLY)}
          </Button>
        </section>
      )}
    </>
  );
}
