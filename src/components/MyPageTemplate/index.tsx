import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { AppDispatch, RootState } from 'store';
import Divider from 'components/Divider';
import MenuItemLink from 'components/MyPageTemplate/MenuItemLink';
import PhoneNumberSection from 'components/MyPageTemplate/PhoneNumberSection';
import {
  PAGE_TITLES,
  USER_INFO_LABELS,
  USER_ACTIONS,
} from 'components/MyPageTemplate/constants';
import { fetchUserInfo } from 'store/user/user-actions';
import LogOut from 'components/LogOut';
import { saveToSessionStorage } from 'utils/sessionStorage';
import ExperimentSection from './ExperimentSection';
import UserIcon from '../../assets/ic_myPage_user.svg';
import InfoIcon from '../../assets/ic_myPage_info.svg';

function MyPageTemplate() {
  const { t } = useTranslation<'translation'>();
  const { lng } = useSelector((state: RootState) => state.common);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  saveToSessionStorage('role', user.role);

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  return (
    <>
      <div className="flex items-center gap-1 p-2.5">
        <img src={UserIcon} alt="user" />
        <h2 className="text-heading-3">{t(PAGE_TITLES.MY_INFO)}</h2>
      </div>
      <div className="flex flex-col">
        <div>
          <div className="p-2.5 text-solo-large">
            {t(USER_INFO_LABELS.EMAIL)}
          </div>
          <div className="p-2.5 text-solo-medium text-gray-1">
            {user?.email}
          </div>
        </div>
        {lng === 'ko' && user.id && (
          <PhoneNumberSection phoneNumber={user.phoneNumber} />
        )}
        <MenuItemLink
          to="/my-page/password"
          label={t(USER_ACTIONS.CHANGE_PASSWORD)}
        />
        <Divider />
        <ExperimentSection isOn={user.isPetInitiatedLetterEnabled} />

        <Divider />
        <div className="mt-9 flex items-center gap-1 p-2.5">
          <img src={InfoIcon} alt="info" />
          <h2 className="text-heading-3">기타</h2>
        </div>
        <MenuItemLink to="faqs" label={t(PAGE_TITLES.FAQ)} />
        <MenuItemLink to="leave" label={t(USER_ACTIONS.LEAVE)} />
        <LogOut>
          <div className="mt-5 p-2.5 text-solo-large text-alarm-red">
            {t(USER_ACTIONS.LOG_OUT)}
          </div>
        </LogOut>
      </div>
    </>
  );
}

export default MyPageTemplate;
