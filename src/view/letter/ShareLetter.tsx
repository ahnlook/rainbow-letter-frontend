import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import SentPhoto from 'components/LetterBox/SentPhoto';
import AppBar from 'components/AppBar';
import Button from 'components/Button';
import { USER_ACTIONS } from 'components/LetterBox/constants';
import LetterPaperWithImage from 'components/Write/LetterPaperWithImage';
import WrittenLetterPaper from 'components/Write/WrittenLetterPaper';
import CoverImage from 'components/Common/CoverImage';
import { getShareLetter } from 'api/letter';
import metaData from 'utils/metaData';
import {
  formatDateIncludingHangul,
  formatDateIncludingEnglish,
} from 'utils/date';
import { isKakaoTalk } from 'utils/device';
import { formatImageType } from 'utils/image';
import { RootState } from 'store';

const TARGET_URL = window.location.href;

export default function ShareLetter() {
  const { lng } = useSelector((state: RootState) => state.common);
  const { t } = useTranslation<'translation'>();
  const [letterData, setLetterData] = useState<any>();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    (async () => {
      if (isKakaoTalk()) {
        return (window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(TARGET_URL)}`);
      }

      metaData(Object.keys(params)[0]);
      const { data } = await getShareLetter(params.shareLink);
      setLetterData(data);
    })();
  }, []);

  const onClickReplyButton = () => {
    navigate('/write-letter', { state: letterData?.pet.id });
  };

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

  return (
    <>
      {letterData && (
        <main className="relative pb-10">
          <AppBar />
          <LetterPaperWithImage>
            <CoverImage image={formatImageType(letterData?.pet.image)} />
            <WrittenLetterPaper
              petName={targetValueFromPet}
              content={letterData.reply.content}
              className="pt-[15.187rem]"
              letterPaperColor="bg-orange-50"
              date={
                lng === 'ko'
                  ? formatDateIncludingHangul(letterData.letter.createdAt)
                  : formatDateIncludingEnglish(letterData.letter.createdAt)
              }
            />
            <WrittenLetterPaper
              petName={targetValueToPet}
              content={letterData.letter.content}
              className="mt-4"
              letterPaperColor="bg-gray-2"
              date={
                lng === 'ko'
                  ? formatDateIncludingHangul(letterData.letter.createdAt)
                  : formatDateIncludingEnglish(letterData.letter.createdAt)
              }
            />
          </LetterPaperWithImage>
          {letterData.letter.image && <SentPhoto letterData={letterData} />}
          <Button
            disabled={!letterData.reply.content}
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
