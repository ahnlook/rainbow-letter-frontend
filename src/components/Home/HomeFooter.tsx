import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { FOOTER_MESSAGE } from 'components/Home/constants';
import blog from '../../assets/blog.png';

import { RootState } from 'store';

export default function HomeFooter() {
  const { t } = useTranslation<'translation'>();
  const { lng } = useSelector((state: RootState) => state.common);

  return (
    <footer className="flex flex-col items-center pb-40 pt-5 text-caption text-gray-1">
      <Link to={`mailto:rainbowletter41@gmail.com`} className="mb-[1.125rem]">
        {t(FOOTER_MESSAGE.ADDRESS)}
      </Link>
      <div className="mb-[1.125rem] text-center">
        <p>{t(FOOTER_MESSAGE.COPYRIGHT)}</p>
        <p>{t(FOOTER_MESSAGE.COPYRIGHT_2)}</p>
      </div>
      {lng === 'ko' && (
        <Link to={`${FOOTER_MESSAGE.BLOG}`} target="_blank">
          <img src={blog} width={46} alt="blog" />
        </Link>
      )}
    </footer>
  );
}
