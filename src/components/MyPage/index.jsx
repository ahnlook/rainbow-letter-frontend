import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { removeToken } from '../../store/user';
// eslint-disable-next-line import/no-cycle
import { getUserInfo, updatePhoneNumber } from '../../api/user';
import {
  PAGE_TITLES,
  USER_INFO_LABELS,
  USER_INFO_MESSAGES,
  USER_ACTIONS,
} from './constants';
import { validatePhoneNumber } from '../../utils/validators';
import chevronRight from '../../assets/chevronRight.svg';
import Divider from '../Divider';

function MyPage() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    phone: '',
  });
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [editedPhone, setEditedPhone] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);
  const phoneConstant = userInfo.phone || USER_INFO_LABELS.NO_PHONE;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleEditPhone = () => {
    setIsEditingPhone(!isEditingPhone);
    setEditedPhone(userInfo.phone);
  };

  const handlePhoneChange = ({ target }) => {
    setEditedPhone(target.value);
    setIsValidPhone(validatePhoneNumber(target.value));
  };

  const savePhone = async () => {
    if (!isValidPhone) return;
    if (editedPhone === userInfo.phone) {
      setIsEditingPhone(false);
      return;
    }

    try {
      await updatePhoneNumber();
      setUserInfo({ ...userInfo, phone: editedPhone });
      setIsEditingPhone(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    if (user.token) dispatch(removeToken());
    navigate('/');
  };

  useEffect(() => {
    const fetchAndSetUserInfo = async () => {
      try {
        const info = await getUserInfo();
        setUserInfo(info);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchAndSetUserInfo();
  }, []);

  return (
    <section className="py-3">
      <div className="text-heading-3 p-[10px]">{PAGE_TITLES.MY_INFO}</div>
      <div className="flex flex-col mb-14 gap-y-[22px]">
        <div>
          <div className="text-solo-large p-[10px]">
            {USER_INFO_LABELS.EMAIL}
          </div>
          <div className="p-[10px] text-solo-medium text-gray-1">
            {userInfo.email}
          </div>
        </div>
        <div>
          <div className="p-[10px] text-solo-large">
            {USER_INFO_LABELS.PHONE}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-x-[10px] items-center text-solo-medium text-gray-1">
              {isEditingPhone ? (
                <input
                  className={`grow bg-gray-2 p-4 rounded-2xl outline-none ${
                    isValidPhone ? 'border-none' : 'border border-alarm-red'
                  }`}
                  type="tel"
                  pattern="\d*"
                  maxLength="11"
                  value={editedPhone}
                  placeholder={USER_INFO_MESSAGES.ENTER_DIGITS_ONLY}
                  onChange={handlePhoneChange}
                />
              ) : (
                <div className="grow p-[10px] text-solo-caption">
                  {phoneConstant}
                </div>
              )}
              <button
                className={`px-[10px] py-[9px] text-xs font-semibold leading-3 rounded ${
                  isValidPhone
                    ? 'bg-orange-400 text-white'
                    : 'bg-gray-1 text-gray-1'
                }`}
                type="button"
                onClick={isEditingPhone ? savePhone : toggleEditPhone}
              >
                {isEditingPhone ? USER_ACTIONS.FINISH : USER_ACTIONS.EDIT}
              </button>
            </div>
            <div>
              {!isValidPhone && (
                <p className="px-[10px] text-caption text-alarm-red">
                  {USER_INFO_MESSAGES.INVALID_PHONE}
                </p>
              )}
            </div>
          </div>
        </div>
        <Link
          to="/members/password/reset"
          className="flex justify-between items-center"
        >
          <div className="p-[10px] text-solo-large">
            {USER_ACTIONS.CHANGE_PASSWORD}
          </div>
          <div>
            <img src={chevronRight} alt="chevronRight" />
          </div>
        </Link>
        <div className="p-[10px]">
          <Divider />
        </div>
        <Link
          to="/faqs"
          className="flex justify-between items-center"
          type="button"
        >
          <div className="p-[10px] text-solo-large">{PAGE_TITLES.FAQ}</div>
          <div>
            <img src={chevronRight} alt="chevronRight" />
          </div>
        </Link>
        <Link to="/leave" className="flex justify-between items-center">
          <div className="p-[10px] text-solo-large">{USER_ACTIONS.LEAVE}</div>
          <div>
            <img src={chevronRight} alt="chevronRight" />
          </div>
        </Link>
        <button
          className="flex justify-between items-center"
          type="button"
          onClick={() => handleLogout()}
        >
          <div className="p-[10px] text-solo-large text-alarm-red">
            {USER_ACTIONS.LOG_OUT}
          </div>
        </button>
      </div>
    </section>
  );
}

export default MyPage;