import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import { useTranslation } from 'react-i18next';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from 'components/Button';
import WrittenLetterPaper from 'components/Write/WrittenLetterPaper';
import LetterPaperWithImage from 'components/Write/LetterPaperWithImage';
import { USER_ACTIONS } from 'components/LetterBox/constants';
import CoverImageWithTimeStamp from 'components/Common/CoverImageWithTimeStamp';
import DownLoadButton from 'components/Write/DownLoadButton';
import { RootState, useAppDispatch } from 'store';
import { getPreLetter } from 'api/letter';
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
import { postData } from 'api/data';

export default function DetailPreLetter() {
  // redux
  const dispatch = useAppDispatch();
  const { t } = useTranslation<'translation'>();
  const { lng } = useSelector((state: RootState) => state.common);
  const { isOpen } = useSelector((state: RootState) => state.toolTip);

  // ref
  const sectionRef = useRef<HTMLDivElement>(null);

  // state
  const [letterData, setLetterData] = useState<any>();

  // etc.
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      metaData(Object.keys(params)[0]);
      const { data } = await getPreLetter(params.letterId);
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
    navigate('/write-letter', { state: letterData?.petId });
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
            const date = document.querySelector(
              `${type === 'image_reply' ? '.reply_date' : '.letter_date'}`
            ) as HTMLElement;

            if (type === 'image_reply') {
              cate = '답장';
            }

            if (letterBox) {
              letterBox.style.paddingTop = '15px';
              button.style.display = 'none';
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
            link.download = `${fileDate}_${letterData?.petName} ${cate}`;
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
    handleSaveToImage('image_letter');
  }, []);

  const targetValueToPet = useMemo(() => {
    if (lng === 'ko') {
      return `${letterData?.petName}로부터`;
    }

    return `From. ${letterData?.petName}`;
  }, [lng, letterData?.petName]);

  return (
    <>
      {letterData && (
        <section className="letterBox relative" ref={sectionRef}>
          {isOpen && (
            <div className="absolute -right-[10px] -top-[16px] z-50 rounded-[12px] border border-orange-400 bg-white px-3 py-2 text-center opacity-100 transition-opacity duration-300">
              <p className={`${lng === 'ko' ? 'pt-[3px]' : ''} text-[12px]`}>
                {t('inBox.saveUpLine')} <br />
                {t('inBox.saveDownLine')}
              </p>
              <div className="absolute -top-[5px] right-[18px] z-50 size-2 rotate-[315deg] border-r border-t border-orange-400 bg-white"></div>
            </div>
          )}

          <div className="slide-btn flex justify-between">
            <div className="flex gap-x-1 text-sm">
              <div className="flex cursor-pointer items-center gap-x-[2px] border-b border-black px-3 py-2 text-[#252525]">
                <img src={LetterIcon} alt="letter" className="brightness-0" />
                <span>아이 편지</span>
              </div>
            </div>
            <DownLoadButton onClick={onClickSaveIcon} />
          </div>

          <div>
            <LetterPaperWithImage>
              <CoverImageWithTimeStamp image={getImage(letterData?.petImage)} />
              <WrittenLetterPaper
                petName={targetValueToPet}
                content={letterData.content}
                className="pt-[15.187rem]"
                letterPaperColor="bg-gray-2"
                date={
                  lng === 'ko'
                    ? formatDateIncludingHangul(letterData.createdAt)
                    : formatDateIncludingEnglish(letterData.createdAt)
                }
                saveType={{
                  target: 'letter_down',
                  unTargetValue: 'letter_value',
                  date: 'letter_date',
                }}
              />
            </LetterPaperWithImage>
          </div>
          <div className="w-full">
            <img src={captureLogo} alt="로고" className="logo hidden" />
          </div>
          <Button
            id="reply_write"
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
