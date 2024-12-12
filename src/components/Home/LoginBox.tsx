import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { INFO_MESSAGES, USER_ACTIONS } from 'components/Home/constants';
import { T } from 'types/translate';

export default function LoginBox() {
  const { t }: T = useTranslation();

  return (
    <article className="flex flex-col items-center gap-y-5 rounded-2xl border border-gray-3 px-[1.063rem] py-5">
      <header className="flex flex-col items-center gap-y-3">
        <h4 className="text-heading-3 font-bold">
          {t(INFO_MESSAGES.LOGIN_ABSENT)}
        </h4>
        <p>{t(INFO_MESSAGES.INFOMATION_ABOUT_LETTER_WRITING_METHOD)}</p>
      </header>
      <main className="flex h-[3.812rem] w-full gap-x-4 text-solo-large font-bold">
        <Link
          to="/login"
          className="flex w-full items-center justify-center rounded-2xl bg-orange-400 text-white"
        >
          {t(USER_ACTIONS.LOGIN)}
        </Link>
        <Link
          to="/sign-up"
          className="flex w-full items-center justify-center rounded-2xl border-2 border-orange-400 text-orange-400"
        >
          {t(USER_ACTIONS.SIGH_UP)}
        </Link>
      </main>
    </article>
  );
}
