import { useMemo } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import appBarConfig from 'components/AppBar/constants';
import DonateAppBar from 'components/Donate/AppBar';
import normalizePath from 'utils/normalizers';
import chevronLeft from '../../assets/chevronLeft.svg';
import autoSaving from '../../assets/autoSaving.svg';
import autoSavingSuccess from '../../assets/autoSave_success.svg';
import autoSavingFail from '../../assets/autoSave_fail.svg';
import { T } from '../../types/translate';
import commonSlice from 'store/common/common-slice';

function AppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { t }: T = useTranslation();
  const { lng } = useSelector((state: RootState) => state.common);
  const normalizedPath = normalizePath(location.pathname);
  const params = Object.keys(useParams())[0];
  const config = appBarConfig[params] || appBarConfig[normalizedPath];

  const toggleLanguage = () => {
    const nextLng = lng === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(nextLng);
    dispatch(commonSlice.actions.setLng(nextLng));
  };

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
        <div className="absolute right-0 flex items-center justify-between gap-2 text-center text-[14px]">
          <p>{lng === 'ko' ? '한국어' : 'English'}</p>
          <div
            className={`flex h-6 w-12 cursor-pointer items-center rounded-full p-1 ${
              lng === 'ko' ? 'bg-[#666666]' : 'bg-gray-300'
            }`}
            onClick={toggleLanguage}
          >
            <div
              className={`size-4 rounded-full bg-white shadow-md transition-transform ${
                lng === 'ko' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </div>
        </div>
      </header>
    </section>
  );
}

export default AppBar;
