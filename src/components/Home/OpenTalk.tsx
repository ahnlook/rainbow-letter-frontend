import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { OPEN_TALK_MESSAGE } from 'components/Home/constants';
import kakaoLogo from 'assets/kakao-logo.svg';
import { T } from 'types/translate';

export default function OpenTalk() {
  const { t }: T = useTranslation();

  return (
    <section className="mb-2.5 mt-9 h-[3.125rem] gap-2.5 px-7">
      <Link
        to="http://pf.kakao.com/_MNevG/chat"
        target="_blank"
        className="flex size-full items-center justify-center gap-x-2.5 rounded-2xl bg-orange-50 text-solo-label font-semibold text-orange-400"
      >
        <div className="size-6">
          <img src={kakaoLogo} alt="kakao" width="100%" height="100%" />
        </div>
        <p className="font-bold">{t(OPEN_TALK_MESSAGE)}</p>
      </Link>
    </section>
  );
}
