/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import UserInput from 'components/Login/UserInput';
import Button from 'components/Button';
import { UPDATE_PASSWORD_MESSAGE } from 'components/Login/constants';
import { validatePassword, validatePasswordMatch } from 'utils/validators';

type Props = {
  onClick: (password: string) => void;
};

function PasswordResetForm({ onClick }: Props) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isValidPassword = validatePassword(newPassword);
  const isMatching = validatePasswordMatch(newPassword, confirmPassword);

  return (
    <main className="flex flex-col justify-center h-screen">
      <section>
        <h2 className="text-heading-2 text-center">
          {UPDATE_PASSWORD_MESSAGE.TITLE}
        </h2>
        <p className="text-solo-medium text-gray-1 text-center mt-[18px]">
          {UPDATE_PASSWORD_MESSAGE.DESCRIPTION}
        </p>
      </section>
      <section className="mt-[38px]">
        <label htmlFor="newPassword" className="block p-2.5">
          {UPDATE_PASSWORD_MESSAGE.NEW_PASSWORD}
        </label>
        <UserInput
          placeholder="비밀번호를 입력해주세요"
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={({ target }) => setNewPassword(target.value)}
          isNotValid={newPassword.length > 0 && !isValidPassword}
          errorMessage={
            newPassword.length > 0 &&
            !isValidPassword &&
            '영어, 숫자 포함 8자리 이상 입력해주세요.'
          }
        />
        <label htmlFor="newPasswordCheck" className="block p-2.5 mt-2">
          {UPDATE_PASSWORD_MESSAGE.NEW_PASSWORD_CONFIRM}
        </label>
        <UserInput
          placeholder="비밀번호를 입력해주세요"
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
            '비밀번호를 다시 확인해주세요.'
          }
        />
        <Button
          className="mt-5"
          disabled={!isValidPassword || !isMatching}
          onClick={() => onClick(newPassword)}
        >
          {UPDATE_PASSWORD_MESSAGE.UPDATE}
        </Button>
      </section>
    </main>
  );
}

export default PasswordResetForm;