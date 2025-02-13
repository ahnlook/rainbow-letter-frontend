import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { USER_ACTIONS } from 'components/Write/constants';
import thinPlus from '../../assets/ic_round-plus.svg';

export default function ResisterButtonSection() {
  const { t } = useTranslation<'translation'>();

  return (
    <section className="mt-5">
      <Link
        to="/my-pets/register"
        className="flex cursor-pointer items-center justify-center gap-1.5 rounded-2xl border border-dashed border-orange-400 py-5 text-solo-medium text-orange-400"
      >
        <img src={thinPlus} alt="thin plus icon" />
        <p>{t(USER_ACTIONS.RESISTER_PET)}</p>
      </Link>
    </section>
  );
}
