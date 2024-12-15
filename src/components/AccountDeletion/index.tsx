import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button';
import {
  USER_ACTIONS,
  ACCOUNT_DELETION,
  ACCOUNT_DELETION_GUIDELINES,
  ACCOUNT_DELETION_GUIDELINES_TITLE_EN,
  ACCOUNT_DELETION_GUIDELINES_EN,
} from 'components/AccountDeletion/constants';
import { deleteUser } from 'api/user';
import { removeToken } from 'utils/localStorage';
import { clearSessionStorage } from 'utils/sessionStorage';
import check from '../../assets/check.svg';
import { RootState } from 'store';
import { T } from 'types/translate';

function AccountDeletion() {
  const { t }: T = useTranslation();
  const { lng } = useSelector((state: RootState) => state.common);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleDeletion = async () => {
    try {
      await deleteUser();
      const message =
        lng === 'ko' ? '탈퇴가 완료됐어요' : 'Withdrawal has been completed';
      alert(message);
      removeToken();
      clearSessionStorage();
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="flex h-screen flex-col gap-40 pb-5">
      <section className="rounded-2xl bg-gray-2 p-7">
        <span className="text-solo-large">
          {t(ACCOUNT_DELETION.GUIDELINES_TITLE)}
        </span>
        {lng === 'ko' ? (
          <ul className="list-disc space-y-1.5 p-2.5 text-body-small text-gray-1">
            {ACCOUNT_DELETION_GUIDELINES.map((guideline) => (
              <li key={guideline.ID}>{guideline.CONTENT}</li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 font-[400] text-[#616161]">
            <p>{ACCOUNT_DELETION_GUIDELINES_TITLE_EN}</p>
            <ul className="mt-1 list-disc leading-[22px]">
              {ACCOUNT_DELETION_GUIDELINES_EN.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <section className="flex flex-col gap-[1.375rem]">
        <button
          className="flex gap-2"
          type="button"
          onClick={() => {
            setIsConfirmed(!isConfirmed);
          }}
        >
          <div
            className={`size-6 rounded ${
              isConfirmed
                ? 'bg-orange-400'
                : 'border border-orange-400 bg-white'
            }`}
          >
            {isConfirmed && <img src={check} alt="check" />}
          </div>
          <div>
            <span className="text-body-medium font-semibold text-gray-1">
              {t(ACCOUNT_DELETION.CONFIRM_MESSAGE)}
            </span>
          </div>
        </button>
        <Button disabled={!isConfirmed} onClick={handleDeletion}>
          {t(USER_ACTIONS.LEAVE)}
        </Button>
      </section>
    </div>
  );
}

export default AccountDeletion;
