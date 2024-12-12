import { useTranslation } from 'react-i18next';

import { PHONE_MESSAGE } from 'components/Home/constants';
import phone from '../../assets/Phone.svg';
import { T } from 'types/translate';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export default function PhoneButton() {
  const { t }: T = useTranslation();
  const { lng } = useSelector((state: RootState) => state.common);
  const handlePhoneButtonClick = () => {
    if (lng === 'ko') {
      return (document.location.href = 'tel:109');
    }

    return (document.location.href = 'tel:988');
  };

  return (
    <section className="mb-8 h-[3.125rem] px-7">
      <button
        type="button"
        onClick={() => handlePhoneButtonClick()}
        className="flex size-full items-center justify-center gap-x-2.5 rounded-2xl bg-orange-50 py-4 text-solo-label font-bold text-orange-400"
      >
        <div className="size-4">
          <img src={phone} alt="phone" width="100%" height="100%" />
        </div>
        <p>{t(PHONE_MESSAGE)}</p>
      </button>
    </section>
  );
}
