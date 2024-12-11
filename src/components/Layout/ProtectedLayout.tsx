import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { getToken, removeToken } from 'utils/localStorage';
import NavBar from 'components/NavBar';
import AppBar from 'components/AppBar';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import NavBarForEn from 'components/NavBar/NavBarForEn';

function ProtectedLayout() {
  const { lng } = useSelector((state: RootState) => state.common);
  const location = useLocation();
  const navigate = useNavigate();
  const token = getToken();
  const isLoggedIn = !!token;

  const isShowAppBar = location.pathname !== '/my-page/password';

  useEffect(() => {
    if (!isLoggedIn) {
      removeToken();
      navigate('/sign-up', { replace: true });
    }
  }, [isLoggedIn, location]);

  return (
    <>
      {isShowAppBar && <AppBar />}
      <div className="pb-28">
        <Outlet />
      </div>
      {lng === 'ko' ? <NavBar /> : <NavBarForEn />}
    </>
  );
}

export default ProtectedLayout;
