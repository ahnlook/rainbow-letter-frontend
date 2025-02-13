import { useTranslation } from 'react-i18next';

import PetRegisterButton from 'components/MyPetsTemplate/PetRegisterButton';
import { INFO_MESSAGES, USER_ACTIONS } from './constants';
import PetHouse from '../../assets/ic_petsHouse.png';

function NoPets() {
  const { t } = useTranslation<'translation'>();
  return (
    <div className="flex h-[72vh] items-center justify-center">
      <section className="flex w-full flex-col gap-y-12 text-center">
        <div className="flex flex-col">
          <img
            src={PetHouse}
            alt="동물 집 이미지"
            className="mx-auto mb-2.5 size-[140px]"
          />
          <span className="pt-2.5 text-heading-3">
            {t(INFO_MESSAGES.LETTER_RECIPIENT_ABSENT)}
          </span>
          <span className="text-heading-3">{t('inBox.noPetDownLine')}</span>
          <span className="p-2.5 text-solo-medium">
            {t(INFO_MESSAGES.SUGGEST_PET_REGISTRATION)}
          </span>
        </div>
        <PetRegisterButton>{t(USER_ACTIONS.REGISTER)}</PetRegisterButton>
      </section>
    </div>
  );
}

export default NoPets;
