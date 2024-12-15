import {
  useState,
  useEffect,
  useCallback,
  MouseEvent,
  ChangeEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import UserInput from 'components/Login/UserInput';
import SubmitButton from 'components/Login/SubmitButton';
import Agree from 'components/Login/SignUp/Agree';
import { ERROR_MESSAGE, Message } from 'components/Login/constants';
import { trySignUp, tryLogin } from 'api/user';
import { passwordError, emailError, emailErrorMessage } from 'utils/errorData';
import { saveToken } from 'utils/localStorage';
import { validateEmail, validatePassword } from 'utils/validators';
import { LoginRequest, ErrorData } from 'types/user';
import { T } from 'types/translate';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type Props = {
  message: Message;
};

export default function SignUpForm({ message: { describe, button } }: Props) {
  const navigate = useNavigate();
  const { t }: T = useTranslation();
  const { lng } = useSelector((state: RootState) => state.common);
  const [profile, setProfile] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<ErrorData | null>(null);

  useEffect(() => {
    setErrorData(null);
  }, [profile, isChecked]);

  const isCheckProperForm = () => {
    const { email, password } = profile;
    if (!validateEmail(email)) {
      throw new Error('NOT_VALID_EMAIL');
    }
    if (!validatePassword(password)) {
      throw new Error('NOT_VALID_PASSWORD');
    }
  };

  const onErrorHandling = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return setErrorData(error.response && error.response.data);
      }
    }
    if (error instanceof Error) {
      setErrorData({
        code: error.message,
        message: ERROR_MESSAGE[error.message],
      });
    }
  };

  const onClickSignUpButton = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      try {
        e.preventDefault();
        isCheckProperForm();
        if (!isChecked) {
          const messag =
            lng === 'ko'
              ? '서비스 이용약관 및 개인정보 처리방침을 체크해주세요!'
              : 'Please check the Terms of Service and Privacy Policy!';
          return alert(messag);
        }
        await trySignUp(profile);
        const { data } = await tryLogin(profile);
        saveToken(data.token);

        setErrorData(null);
        navigate('/');
      } catch (error) {
        onErrorHandling(error);
      }
    },
    [profile, errorData, isChecked]
  );

  return (
    <section className="mt-9">
      <header className="flex items-center justify-between">
        <div className="w-[5.25rem] border-t" />
        <h3 className="text-solo-small">{t(describe)}</h3>
        <div className="w-[5.25rem] border-t" />
      </header>
      <form className="mt-6">
        <UserInput
          type="text"
          value={profile.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setProfile({ ...profile, email: e.target.value })
          }
          placeholder={t('signUp.emailPlaceholder')}
          isNotValid={errorData && emailError(errorData)}
          errorMessage={errorData && emailErrorMessage(errorData)}
        />
        <UserInput
          type="password"
          value={profile.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setProfile({ ...profile, password: e.target.value })
          }
          placeholder={t('signUp.passwordPlaceholder')}
          isNotValid={errorData && passwordError(errorData)}
          errorMessage={errorData ? t(errorData?.message) : ''}
        />
        <Agree setIsChecked={setIsChecked} />
        <SubmitButton
          onclick={(e: MouseEvent<HTMLButtonElement>) => onClickSignUpButton(e)}
          disabled={errorData}
          className={`${
            errorData ? 'bg-gray-1 text-gray-1' : 'bg-orange-400 text-white'
          } mt-6 flex w-full items-center justify-center rounded-2xl py-[1.375rem] text-heading-3`}
          value={t(button.default)}
        />
      </form>
    </section>
  );
}
