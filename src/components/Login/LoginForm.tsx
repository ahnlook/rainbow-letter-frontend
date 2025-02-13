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
import { Message } from 'components/Login/constants';
import { tryLogin } from 'api/user';
import { passwordError, emailError, emailErrorMessage } from 'utils/errorData';
import { saveToken } from 'utils/localStorage';
import { ErrorData } from 'types/user';

type Props = {
  message: Message;
};

export default function LoginForm({ message: { describe, button } }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation<'translation'>();
  const [profile, setProfile] = useState({
    email: '',
    password: '',
  });
  const [errorData, setErrorData] = useState<ErrorData | null>(null);

  useEffect(() => {
    setErrorData(null);
  }, [profile]);

  const onClickLoginButton = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      try {
        e.preventDefault();
        const { data } = await tryLogin(profile);

        setErrorData(null);
        saveToken(data.token);

        navigate('/');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return setErrorData(error.response && error.response.data);
        }
      }
    },
    [profile, errorData]
  );

  return (
    <section className="mt-10">
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
          placeholder={t('login.emailPlaceholder')}
          isNotValid={errorData && emailError(errorData)}
          errorMessage={errorData && emailErrorMessage(errorData)}
          className="mb-3.5"
        />
        <UserInput
          type="password"
          value={profile.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setProfile({ ...profile, password: e.target.value })
          }
          placeholder={t('login.passwordPlaceholder')}
          isNotValid={errorData && passwordError(errorData)}
          errorMessage={errorData && errorData.message}
        />
        <SubmitButton
          onclick={(e: MouseEvent<HTMLButtonElement>) => onClickLoginButton(e)}
          value={t(button.default)}
          disabled={errorData !== null}
          className={`${
            errorData ? 'bg-gray-1 text-gray-1' : 'bg-orange-400 text-white'
          } mt-[1.125rem] flex w-full items-center justify-center rounded-2xl py-[1.375rem] text-heading-3`}
        />
      </form>
    </section>
  );
}
