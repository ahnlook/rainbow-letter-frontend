import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';

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
import { formatDateIncludingHangul } from 'utils/date';
import { isiPhone } from 'utils/device';
import { modalActions } from 'store/modal/modal-slice';
import { letterActions } from 'store/letter/letter-slice';
import { readReply } from '../../api/reply';
import captureLogo from '../../assets/detailLetter_logo.svg';
import { formatImageType } from 'utils/image';
import { toolTipActions } from 'store/toolTip/toolTip-slice';
import { getFirstReplyUser } from 'utils/localStorage';

export default function DetailLetter() {
  // redux
  const dispatch = useAppDispatch();
  const isSave = useSelector((state: RootState) => state.letter.isSaveToImage);
  const letterType = useSelector((state: RootState) => state.letter.letterType);
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
      const { data } = await getLetter(params.letterId);
      setLetterData(data);
      if (data.reply?.status === 'REPLY') {
        await readReply(data.reply.id);
      }
      const isFirst = getFirstReplyUser();
      if (!isFirst) {
        dispatch(toolTipActions.openToolTip());
      }
    })();
  }, []);

  const onClickReplyButton = () => {
    navigate('/write-letter', { state: letterData?.pet.id });
  };

  const handleSaveToImage = useCallback(
    async (type: string | null) => {
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
              letterBox.style.paddingLeft = '20px';
              letterBox.style.paddingRight = '20px';
              letterBox.style.paddingTop = '15px';
              button.style.display = 'none';
              unSelectedLetter.style.display = 'none';
              saveBtn.style.display = 'none';

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
          .then(() => {
            if (isIphone) {
              return navigate('/saved-image');
            }
            return dispatch(modalActions.openModal('SAVECOMPLETE'));
          });
      }
    },
    [letterData]
  );

  useEffect(() => {
    if (isSave) {
      handleSaveToImage(letterType);
    }

    return () => {
      dispatch(letterActions.saveToImage(false));
    };
  }, [isSave, letterType]);

  const onClickSaveIcon = useCallback(async () => {
    dispatch(modalActions.openModal('IMAGE'));
  }, [dispatch]);

  const isExistReply = !!letterData?.reply?.content;

  return (
    <>
      {letterData && (
        <main className="letterBox relative" ref={sectionRef}>
          {isOpen && (
            <div
              className={`${isExistReply ? 'opacity-100' : 'opacity-0'} absolute -right-[10px] -top-[16px] z-50 rounded-[12px] border border-orange-400 bg-white px-3 py-2 text-center transition-opacity duration-300`}
            >
              <p className="text-[12px]">
                아이와의 편지를 이미지로 <br />
                저장할 수 있어요
              </p>
              <div className="absolute -top-[5px] right-[18px] z-50 size-2 rotate-[315deg] border-r border-t border-orange-400 bg-white"></div>
            </div>
          )}

          {isExistReply && <DownLoadButton onClick={onClickSaveIcon} />}
          <LetterPaperWithImage>
            <CoverImageWithTimeStamp
              image={formatImageType(letterData?.pet.image)}
            />
            {isExistReply && (
              <WrittenLetterPaper
                petName={`${letterData.pet.name}로부터`}
                content={letterData.reply.content}
                className="pt-[15.187rem]"
                letterPaperColor="bg-orange-50"
                date={formatDateIncludingHangul(letterData.reply.updatedAt)}
                saveType={{
                  target: 'reply_down',
                  unTargetValue: 'reply_value',
                  date: 'reply_date',
                }}
              />
            )}
            <WrittenLetterPaper
              petName={`${letterData.pet.name}에게`}
              content={letterData.letter.content}
              className={isExistReply ? 'mt-4' : 'pt-[15.187rem]'}
              letterPaperColor="bg-gray-2"
              date={formatDateIncludingHangul(letterData.letter.updatedAt)}
              saveType={{
                target: 'letter_down',
                unTargetValue: 'letter_value',
                date: 'letter_date',
              }}
            />
          </LetterPaperWithImage>
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
            {USER_ACTIONS.GO_TO_REPLY}
          </Button>
        </main>
      )}
    </>
  );
}
