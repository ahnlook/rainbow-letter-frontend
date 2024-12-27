import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import i18n from 'i18n';

import { RootState } from 'store';
import metaData from 'utils/metaData';
import commonSlice from 'store/common/common-slice';

function Layout() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { lng } = useSelector((state: RootState) => state.common);
  const isHomeLayOut =
    pathname === '/' ||
    pathname === '/donate' ||
    pathname === '/letter-box' ||
    pathname === '/contents' ||
    false;

  useEffect(() => {
    metaData(pathname);
    return () => {
      metaData('default');
    };
  }, [pathname, lng]);

  useEffect(() => {
    const detectedLanguage = i18n.language.split('-')[0];
    i18n.changeLanguage(detectedLanguage);
    dispatch(commonSlice.actions.setLng(detectedLanguage));
  }, []);

  return (
    <div
      className={`${lng === 'ko' ? '' : 'font-HelveticaNowDisplay'} flex size-full min-w-[22.5rem] justify-center bg-white`}
    >
      <div
        className={`${
          isHomeLayOut ? 'overflow-hidden px-0' : 'px-5'
        } w-full max-w-[24.375rem] bg-white`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
