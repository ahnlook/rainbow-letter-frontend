import { useMemo } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useTranslation } from 'react-i18next';

import appBarConfig from 'components/AppBar/constants';
import DonateAppBar from 'components/Donate/AppBar';
import normalizePath from 'utils/normalizers';
import chevronLeft from '../../assets/chevronLeft.svg';
import autoSaving from '../../assets/autoSaving.svg';
import autoSavingSuccess from '../../assets/autoSave_success.svg';
import autoSavingFail from '../../assets/autoSave_fail.svg';
import { T } from '../../types/translate';

function AppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t }: T = useTranslation();
  const { lng } = useSelector((state: RootState) => state.common);
  const normalizedPath = normalizePath(location.pathname);
  const params = Object.keys(useParams())[0];
  const config = appBarConfig[params] || appBarConfig[normalizedPath];

  const { isSaving, isSuccess, isExistPet } = useSelector(
    (state: RootState) => state.letter
  );

  const isShowDonateAppBar = useMemo(() => {
    if (lng === 'en') {
      return false;
    }
    if (
      normalizedPath === '/write-letter' ||
      normalizedPath === '/letter-box'
    ) {
      return true;
    }

    return false;
  }, [lng, normalizedPath]);

  const { titleKey } = config;

  const handleBack = () => {
    navigate(-1);
  };

  const isShowSavingIcon = normalizedPath === '/write-letter' && isExistPet;

  if (!config) {
    return null;
  }

  return (
    <section className="sticky top-0 z-50 flex flex-col">
      {isShowDonateAppBar && <DonateAppBar />}
      <header className="flex items-center justify-between bg-white py-6 pl-5">
        <section className="flex flex-1 justify-start">
          <button type="button" onClick={handleBack}>
            <img src={chevronLeft} alt="left" />
          </button>
        </section>
        <section className="flex-3 text-center text-solo-large">
          {t(titleKey)}
        </section>
        {isShowSavingIcon && (
          <article className="absolute right-2.5 z-10">
            {isSaving ? (
              <img src={autoSaving} alt="자동 저장 중" />
            ) : isSuccess ? (
              <img src={autoSavingSuccess} alt="자동 저장 결과" />
            ) : (
              <img src={autoSavingFail} alt="자동 저장 결과" />
            )}
          </article>
        )}
        <section className="flex flex-1 justify-end" />
      </header>
    </section>
  );
}

export default AppBar;
