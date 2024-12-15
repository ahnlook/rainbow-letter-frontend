import { useTranslation } from 'react-i18next';

import Input from 'components/Input';
import useInputWithAlert from 'hooks/useInputWithAlert';
import { TITLES, INFO_MESSAGES } from './constants';
import PetRegistrationSection from './PetRegistrationSection';
import { usePetRegistration } from '../../contexts/PetRegistrationContext';

function PetNameSection() {
  const { t } = useTranslation();
  const { mandatoryData, setMandatoryData } = usePetRegistration();
  const { inputValue: name, handleChange: handleInputChange } =
    useInputWithAlert({ initialValue: mandatoryData.name });

  const handleNameChange = ({ target }) => {
    setMandatoryData({ ...mandatoryData, name: target.value });
  };

  return (
    <PetRegistrationSection title={TITLES.PET_NAME}>
      <Input
        className="h-[3.75rem] w-full px-5 text-caption"
        placeholder={t(INFO_MESSAGES.ENTER_NAME)}
        value={name}
        onChange={handleInputChange}
        onBlur={handleNameChange}
      />
    </PetRegistrationSection>
  );
}

export default PetNameSection;
