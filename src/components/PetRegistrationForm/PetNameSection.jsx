import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

import Input from 'components/Input';
import useInputWithAlert from 'hooks/useInputWithAlert';
import { TITLES, INFO_MESSAGES } from './constants';
import PetRegistrationSection from './PetRegistrationSection';
import { usePetRegistration } from '../../contexts/PetRegistrationContext';

function PetNameSection() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { mandatoryData, setMandatoryData } = usePetRegistration();
  const { inputValue: name, handleChange: handleInputChange } =
    useInputWithAlert({ initialValue: mandatoryData.name });

  const handleNameChange = ({ target }) => {
    setMandatoryData({ ...mandatoryData, name: target.value });
  };

  const isEdit = pathname.split('/').includes('edit');

  return (
    <PetRegistrationSection title={TITLES.PET_NAME}>
      <Input
        className="h-[3.75rem] w-full px-5 text-caption"
        placeholder={t(INFO_MESSAGES.ENTER_NAME)}
        value={name}
        onChange={handleInputChange}
        onBlur={handleNameChange}
        disabled={isEdit}
      />
      {name && !isEdit && (
        <p className="px-2.5 pt-2.5 text-sm text-alarm-red">
          이름은 나중에 수정할 수 없어요.
        </p>
      )}
    </PetRegistrationSection>
  );
}

export default PetNameSection;
