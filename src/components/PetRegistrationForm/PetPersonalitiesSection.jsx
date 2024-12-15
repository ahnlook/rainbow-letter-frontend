import Chips from 'components/Chips';
import {
  PET_PERSONALITIES,
  PET_PERSONALITIES_EN,
} from 'components/Chips/constants';
import { TITLES } from './constants';
import PetRegistrationSection from './PetRegistrationSection';
import { usePetRegistration } from '../../contexts/PetRegistrationContext';
import { useSelector } from 'react-redux';

function PetPersonalitiesSection() {
  const { optionalData, setOptionalData } = usePetRegistration();
  const { lng } = useSelector((state) => state.common);

  const handleChipSelect = (value) => {
    const currentPersonalities = optionalData.personalities || [];
    const isAlreadySelected = currentPersonalities.includes(value);

    let updatedPersonalities;
    if (isAlreadySelected) {
      updatedPersonalities = currentPersonalities.filter(
        (chip) => chip !== value
      );
    } else if (currentPersonalities.length < 3) {
      updatedPersonalities = [...currentPersonalities, value];
    }

    if (updatedPersonalities) {
      setOptionalData({
        ...optionalData,
        personalities: updatedPersonalities,
      });
    }
  };

  return (
    <PetRegistrationSection
      title={TITLES.PET_PERSONALITIES}
      subTitle={TITLES.OPTION}
    >
      <Chips
        attributes={lng === 'ko' ? PET_PERSONALITIES : PET_PERSONALITIES_EN}
        selectedChips={optionalData.personalities || []}
        onChipSelect={handleChipSelect}
      />
    </PetRegistrationSection>
  );
}

export default PetPersonalitiesSection;
