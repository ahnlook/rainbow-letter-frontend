import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AppBar from 'components/AppBar';
import Button from 'components/Button';
import { USER_ACTIONS } from 'components/LetterBox/constants';
import LetterPaperWithImage from 'components/Write/LetterPaperWithImage';
import WrittenLetterPaper from 'components/Write/WrittenLetterPaper';
import CoverImageWithTimeStamp from 'components/Common/CoverImageWithTimeStamp';
import { getSharePreLetter } from 'api/letter';
import metaData from 'utils/metaData';
import {
  formatDateIncludingHangul,
  formatDateIncludingEnglish,
} from 'utils/date';
import { isKakaoTalk } from 'utils/device';
import { RootState } from 'store';
import { getImage } from 'api/images';
import PetIcon from '../../assets/ic_letter_pet.svg';

const TARGET_URL = window.location.href;

export default function SharePreLetter() {
  const { lng } = useSelector((state: RootState) => state.common);
  const { t } = useTranslation<'translation'>();
  const [letterData, setLetterData] = useState<any>();
  const navigate = useNavigate();
  const params = useParams();

  console.log(letterData);

  useEffect(() => {
    (async () => {
      if (isKakaoTalk()) {
        return (window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(TARGET_URL)}`);
      }

      metaData(Object.keys(params)[0]);
      const { data } = await getSharePreLetter(params.shareLink);
      setLetterData(data);
    })();
  }, []);

  const onClickReplyButton = () => {
    navigate('/write-letter', { state: letterData?.petId });
  };

  const targetValueToPet = useMemo(() => {
    if (lng === 'ko') {
      return `${letterData?.petName}에게`;
    }

    return `Dear. ${letterData?.petName}`;
  }, [lng, letterData?.petName]);

  return (
    <>
      {letterData && (
        <main className="relative pb-10">
          <AppBar />

          <div className="slide-btn flex justify-between">
            <div className="flex gap-x-1 text-sm">
              <div className="flex cursor-pointer items-center gap-x-[2px] border-b border-black px-3 py-2 text-[#252525]">
                <img src={PetIcon} alt="letter" className="brightness-0" />
                <span>아이 편지</span>
              </div>
            </div>
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
              />
            </LetterPaperWithImage>
          </div>

          <Button
            disabled={!letterData.content}
            onClick={onClickReplyButton}
            className="sticky bottom-10 mt-12 max-w-[350px]"
            id="sms_reply"
          >
            {t(USER_ACTIONS.GO_TO_REPLY)}
          </Button>
        </main>
      )}
    </>
  );
}
