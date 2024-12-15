import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ClipLoader from 'react-spinners/ClipLoader';
import Button from 'components/Button';
import usePreventDoubleClick from 'hooks/usePreventDoubleClick';
import { convertDateStringToObject } from 'utils/date';
import PetNameSection from './PetNameSection';
import DateOfDeathSection from './DateOfDeathSection';
import PetTypeSection from './PetTypeSection';
import RoleForPetSection from './RoleForPetSection';
import PetPersonalitiesSection from './PetPersonalitiesSection';
import PetImageSection from './PetImageSection';
import {
  usePetRegistration,
  setInitialPetData,
} from '../../contexts/PetRegistrationContext';
import { formatImageType } from '../../utils/image';

function PetRegistrationForm({ petData, isDisabled, handleSubmit }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const isEdit = pathname.includes('edit');

  const { setMandatoryData, setOptionalData } = usePetRegistration();
  const { isSubmitting, handleButtonClick } = usePreventDoubleClick();

  const setPetData = () => {
    if (petData) {
      const { name, species, owner, deathAnniversary, image, personalities } =
        petData;

      setMandatoryData({
        name,
        species,
        owner,
        deathAnniversary:
          deathAnniversary && convertDateStringToObject(deathAnniversary),
        image: {
          id: image,
          url: formatImageType(image),
        },
      });
      setOptionalData({
        personalities,
      });
    }
  };

  useEffect(() => {
    setPetData();
    return () => {
      setInitialPetData(setMandatoryData, setOptionalData);
    };
  }, [petData]);

  return (
    <div className="flex flex-col gap-y-6 px-2">
      <PetNameSection isEdit={isEdit} />
      <DateOfDeathSection />
      <PetTypeSection />
      <RoleForPetSection />
      <PetPersonalitiesSection />
      <PetImageSection />
      <section className="pt-6">
        {!isSubmitting ? (
          <Button
            disabled={!isDisabled || isSubmitting}
            onClick={handleButtonClick(handleSubmit)}
          >
            <span>{t(isEdit ? 'register.edit' : 'register.register')}</span>
          </Button>
        ) : (
          <div className="text-center">
            <ClipLoader color="#FFB347" />
          </div>
        )}
      </section>
    </div>
  );
}

export default PetRegistrationForm;
