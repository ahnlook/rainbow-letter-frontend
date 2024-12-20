import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { formatDateIncludingHangul } from 'utils/date';
import { isKakaoTalk } from 'utils/device';
import { formatImageType } from 'utils/image';
import { T } from 'types/translate';

const TARGET_URL = window.location.href;

export default function ShareLetter() {
  const { t }: T = useTranslation();
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

  return (
    <>
      {letterData && (
        <main className="relative pb-10">
          <AppBar />
          <LetterPaperWithImage>
            <CoverImage image={formatImageType(letterData?.pet.image)} />
            <WrittenLetterPaper
              petName={`${letterData.pet.name}로부터`}
              content={letterData.reply.content}
              className="pt-[15.187rem]"
              letterPaperColor="bg-orange-50"
              date={formatDateIncludingHangul(letterData.reply.updatedAt)}
            />
            <WrittenLetterPaper
              petName={`${letterData.pet.name}에게`}
              content={letterData.letter.content}
              className="mt-4"
              letterPaperColor="bg-gray-2"
              date={formatDateIncludingHangul(letterData.letter.updatedAt)}
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
