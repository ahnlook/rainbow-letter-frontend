import { useState } from 'react';

import UserInput from 'components/Login/UserInput';
import Button from 'components/Button';
import {
  UPDATE_PASSWORD_MESSAGE,
  ERROR_MESSAGE,
} from 'components/Login/constants';
import { validatePassword, validatePasswordMatch } from 'utils/validators';
import { useTranslation } from 'react-i18next';
import { T } from 'types/translate';

type Props = {
  onClick: (password: string) => void;
};

function PasswordResetForm({ onClick }: Props) {
  const { t }: T = useTranslation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isValidPassword = validatePassword(newPassword);
  const isMatching = validatePasswordMatch(newPassword, confirmPassword);

  return (
    <main className="flex h-screen flex-col justify-center">
      <section>
        <h2 className="text-center text-heading-2">
          {t(UPDATE_PASSWORD_MESSAGE.TITLE)}
        </h2>
        <p className="mt-[1.125rem] text-center text-solo-medium text-gray-1">
          {t(UPDATE_PASSWORD_MESSAGE.DESCRIPTION)}
        </p>
      </section>
      <section className="mt-[2.375rem]">
        <label htmlFor="newPassword" className="block p-2.5">
          {t(UPDATE_PASSWORD_MESSAGE.NEW_PASSWORD)}
        </label>
        <UserInput
          placeholder={t(UPDATE_PASSWORD_MESSAGE.PLACEHOLDER)}
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={({ target }) => setNewPassword(target.value)}
          isNotValid={newPassword.length > 0 && !isValidPassword}
          errorMessage={
            newPassword.length > 0 &&
            !isValidPassword &&
            t(ERROR_MESSAGE.NOT_VALID_PASSWORD)
          }
        />
        <label htmlFor="newPasswordCheck" className="mt-2 block p-2.5">
          {t(UPDATE_PASSWORD_MESSAGE.NEW_PASSWORD_CONFIRM)}
        </label>
        <UserInput
          placeholder={t(UPDATE_PASSWORD_MESSAGE.CONFIRM_PLACEHOLDER)}
          type="password"
          id="newPasswordCheck"
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          isNotValid={
            confirmPassword.length > 0 && newPassword.length > 0 && !isMatching
          }
          errorMessage={
            confirmPassword.length > 0 &&
            newPassword.length > 0 &&
            !isMatching &&
            t(ERROR_MESSAGE.NOT_MATCH)
          }
        />
        <Button
          className="mt-5"
          disabled={!isValidPassword || !isMatching}
          onClick={() => onClick(newPassword)}
        >
          {t(UPDATE_PASSWORD_MESSAGE.UPDATE)}
        </Button>
      </section>
    </main>
  );
}

export default PasswordResetForm;
