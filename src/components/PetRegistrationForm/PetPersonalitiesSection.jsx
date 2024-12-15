import Chips from 'components/Chips';
import {
  PET_PERSONALITIES,
  PET_PERSONALITIES_EN,
} from 'components/Chips/constants';
import { TITLES, PERSONALITY_MAPPING } from './constants';
import PetRegistrationSection from './PetRegistrationSection';
import { usePetRegistration } from '../../contexts/PetRegistrationContext';
import { useSelector } from 'react-redux';

const REVERSE_PERSONALITY_MAPPING = Object.entries(PERSONALITY_MAPPING).reduce(
  (acc, [ko, en]) => ({
    ...acc,
    [en]: ko,
  }),
  {}
);

function PetPersonalitiesSection() {
  const { optionalData, setOptionalData } = usePetRegistration();
  const { lng } = useSelector((state) => state.common);

  const getDisplayPersonalities = (serverPersonalities) => {
    if (!serverPersonalities) return [];

    return serverPersonalities.map((personality) =>
      lng === 'ko'
        ? personality
        : PERSONALITY_MAPPING[personality] || personality
    );
  };

  const getServerPersonalities = (displayPersonality) => {
    return lng === 'ko'
      ? displayPersonality
      : REVERSE_PERSONALITY_MAPPING[displayPersonality] || displayPersonality;
  };

  const handleChipSelect = (value) => {
    const currentPersonalities = optionalData.personalities || [];
    const serverValue = getServerPersonalities(value);
    const isAlreadySelected = currentPersonalities.includes(serverValue);

    let updatedPersonalities;
    if (isAlreadySelected) {
      updatedPersonalities = currentPersonalities.filter(
        (chip) => chip !== serverValue
      );
    } else if (currentPersonalities.length < 3) {
      updatedPersonalities = [...currentPersonalities, serverValue];
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
        selectedChips={getDisplayPersonalities(optionalData.personalities)}
        onChipSelect={handleChipSelect}
      />
    </PetRegistrationSection>
  );
}

export default PetPersonalitiesSection;
