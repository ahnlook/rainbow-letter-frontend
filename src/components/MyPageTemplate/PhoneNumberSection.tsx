import { ChangeEvent, useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';

import { updatePhoneNumber, deletePhoneNumber } from 'store/user/user-actions';
import {
  USER_INFO_LABELS,
  USER_INFO_MESSAGES,
  USER_ACTIONS,
} from 'components/MyPageTemplate/constants';
import { validatePhoneNumber } from 'utils/validators';

type Props = {
  phoneNumber: string | null;
};

function PhoneNumberSection({ phoneNumber }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const reduxPhoneNumber = useSelector(
    (state: RootState) => state.user.user.phoneNumber
  );
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber || '');
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Redux store의 phoneNumber나 props의 phoneNumber가 변경되면 동기화 (편집 중이 아닐 때만)
  useEffect(() => {
    if (!isEditing) {
      const currentPhoneNumber = reduxPhoneNumber || phoneNumber || '';
      setNewPhoneNumber(currentPhoneNumber);
    }
  }, [reduxPhoneNumber, phoneNumber, isEditing]);

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPhoneNumber(e.target.value);
    setIsValidPhone(validatePhoneNumber(e.target.value));
  };

  const handleUpdatePhoneNumber = async () => {
    if (newPhoneNumber === phoneNumber) return;

    try {
      const action = newPhoneNumber
        ? await dispatch(updatePhoneNumber(newPhoneNumber))
        : await dispatch(deletePhoneNumber());

      const message =
        phoneNumber === null
          ? '등록이 완료되었습니다.'
          : '수정이 완료되었습니다.';
      alert(message);

      setIsEditing(false);
      return action;
    } catch (error) {
      alert('휴대폰 번호 업데이트에 실패했습니다.');
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="mt-7 p-2.5">
      <div className="text-solo-large">{USER_INFO_LABELS.PHONE}</div>
      <p className="mt-3 text-sm text-[#616161]">
        답장 알림을 카카오톡으로 받아볼 수 있어요
      </p>
      <div className="flex flex-col gap-2">
        <div className="mt-3 flex max-w-[350px] items-center justify-between gap-x-2.5 text-solo-medium text-gray-1">
          <input
            className={`w-[250px] rounded-md bg-gray-2 px-3 py-2 ${
              isValidPhone ? 'border-none' : 'border border-alarm-red'
            }`}
            type="tel"
            pattern="\d*"
            maxLength={11}
            value={newPhoneNumber}
            placeholder={USER_INFO_MESSAGES.ENTER_DIGITS_ONLY}
            onChange={handlePhoneNumberChange}
            disabled={!isEditing && phoneNumber !== null}
          />
          {phoneNumber === null ? (
            <button
              className="text-nowrap rounded-2xl border border-[#616161] px-2.5 py-2 text-xs font-bold leading-3 text-[#616161]"
              disabled={!isValidPhone}
              onClick={handleUpdatePhoneNumber}
            >
              등록
            </button>
          ) : isEditing ? (
            <button
              className="text-nowrap rounded-2xl border border-[#616161] px-2.5 py-2 text-xs font-bold leading-3 text-[#616161]"
              disabled={!isValidPhone}
              onClick={handleUpdatePhoneNumber}
            >
              완료
            </button>
          ) : (
            <button
              className="text-nowrap rounded-2xl border border-[#616161] px-2.5 py-2 text-xs font-bold leading-3 text-[#616161]"
              onClick={handleEditClick}
            >
              수정
            </button>
          )}
        </div>
        <div>
          {!isValidPhone && (
            <p className="px-2.5 text-caption text-alarm-red">
              {USER_INFO_MESSAGES.INVALID_PHONE}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PhoneNumberSection;
