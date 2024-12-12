import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from 'assets/Logo_256px.png';
import { T } from 'types/translate';

function LetterPostButton() {
  const { t }: T = useTranslation();
  return (
    <section className="mx-5 pb-[1.875rem]">
      <Link
        id="share_letter"
        style={{ boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.15)' }}
        className="flex h-10 w-full items-center justify-center gap-x-1 rounded-2xl"
        to="https://walla.my/letter2"
        target="_blank"
      >
        <div className="size-[15px]">
          <img src={logo} alt="logo" width="100%" height="100%" />
        </div>
        <span className="text-solo-small">{t('home.postLetterToRainbow')}</span>
      </Link>
    </section>
  );
}

export default LetterPostButton;
