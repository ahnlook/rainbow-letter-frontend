import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import UserInput from 'components/Login/UserInput';
import SubmitButton from 'components/Login/SubmitButton';
import {
  ERROR_MESSAGE,
  UPDATE_PASSWORD_MESSAGE,
} from 'components/Login/constants';
import { updatePassword } from 'api/user';
import { removeToken, saveToken } from 'utils/localStorage';
import { validatePasswordMatch, validatePassword } from 'utils/validators';

import { useSelector } from 'react-redux';
import { RootState } from 'store';

type ErrorData = {
  type: string;
  message: string;
};

type UserInfo = {
  password: string;
  newPassword: string;
};

export default function Password() {
  const navigate = useNavigate();
  const { t } = useTranslation<'translation'>();
  const { lng } = useSelector((state: RootState) => state.common);
  const [searchParams] = useSearchParams();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    password: '',
    newPassword: '',
  });
  const [errorData, setErrorData] = useState<ErrorData | null>({
    type: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      saveToken(token);
    }
  }, [searchParams]);

  const isCheckProperPassword = () => {
    const { password, newPassword } = userInfo;
    if (!validatePassword(password)) {
      throw new Error('NOT_VALID_PASSWORD');
    }
    if (!validatePasswordMatch(password, newPassword)) {
      throw new Error('NOT_MATCH');
    }
  };

  const onFinishUpdate = (isSuccess: boolean) => {
    if (isSuccess) {
      setErrorData(null);
    }
    removeToken();
    navigate('/');
  };

  const onErrorHandling = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.data.code === 'UN_AUTHORIZE') {
        const message =
          lng === 'ko'
            ? '토큰 유효기간이 지났습니다.'
            : 'Token expiration period has passed';
        alert(message);
        onFinishUpdate(false);
      }
    }
    if (error instanceof Error) {
      setErrorData({
        ...errorData,
        type: error.message,
        message: ERROR_MESSAGE[error.message],
      });
    }
  };

  const onClickUpdatePasswordButton = useCallback(async () => {
    try {
      setIsLoading(true);
      isCheckProperPassword();
      await updatePassword({
        password: null,
        newPassword: userInfo.newPassword,
      });
      onFinishUpdate(true);
    } catch (error) {
      onErrorHandling(error);
    } finally {
      setIsLoading(false);
    }
  }, [userInfo, errorData]);

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
      <section className="mt-[3.625rem]">
        <label htmlFor="newPassword" className="mb-4 block">
          {t(UPDATE_PASSWORD_MESSAGE.NEW_PASSWORD)}
        </label>
        <UserInput
          placeholder={t(UPDATE_PASSWORD_MESSAGE.PLACEHOLDER)}
          type="password"
          id="newPassword"
          value={userInfo.password || ''}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
          isNotValid={errorData && errorData.type === 'NOT_VALID_PASSWORD'}
          errorMessage={errorData ? t(errorData.message) : ''}
        />
        <label htmlFor="newPasswordCheck" className="mb-4 mt-[3.313rem] block">
          {t(UPDATE_PASSWORD_MESSAGE.NEW_PASSWORD_CONFIRM)}
        </label>
        <UserInput
          placeholder={t(UPDATE_PASSWORD_MESSAGE.CONFIRM_PLACEHOLDER)}
          type="password"
          id="newPasswordCheck"
          value={userInfo.newPassword || ''}
          onChange={(e) =>
            setUserInfo({ ...userInfo, newPassword: e.target.value })
          }
          isNotValid={errorData && errorData.type === 'NOT_MATCH'}
          errorMessage={errorData ? t(errorData.message) : ''}
        />
        <SubmitButton
          disabled={isLoading}
          onclick={() => onClickUpdatePasswordButton()}
          value={t(UPDATE_PASSWORD_MESSAGE.UPDATE)}
          className="mt-[3.625rem] flex w-full items-center justify-center rounded-2xl bg-orange-400 py-[1.375rem] text-heading-3 text-white"
        />
      </section>
    </main>
  );
}
