import { ChangeEvent, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';

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
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber || '');
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPhoneNumber(e.target.value);
    setIsValidPhone(validatePhoneNumber(e.target.value));
  };

  const handleUpdatePhoneNumber = () => {
    if (newPhoneNumber === phoneNumber) return;

    const action = newPhoneNumber
      ? dispatch(updatePhoneNumber(newPhoneNumber))
      : dispatch(deletePhoneNumber());

    const message =
      phoneNumber === null
        ? '등록이 완료되었습니다.'
        : '수정이 완료되었습니다.';
    alert(message);

    setIsEditing(false);
    return action;
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
            className={`flex-1 rounded-md bg-gray-2 px-3 py-2 ${
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
              className="min-w-[43px] shrink-0 rounded-2xl border border-[#616161] px-2.5 py-2 text-xs font-bold leading-3 text-[#616161]"
              disabled={!isValidPhone}
              onClick={handleUpdatePhoneNumber}
            >
              등록
            </button>
          ) : isEditing ? (
            <button
              className="min-w-[43px] shrink-0 rounded-2xl border border-[#616161] px-2.5 py-2 text-xs font-bold leading-3 text-[#616161]"
              disabled={!isValidPhone}
              onClick={handleUpdatePhoneNumber}
            >
              완료
            </button>
          ) : (
            <button
              className="min-w-[43px] shrink-0 rounded-2xl border border-[#616161] px-2.5 py-2 text-xs font-bold leading-3 text-[#616161]"
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
