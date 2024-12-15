import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import Chips from 'components/Chips';
import Chip from 'components/Chips/Chip';
import MiscInput from 'components/Input/MiscInput';
import InputAlert from 'components/InputAlert';
import { PET_TYPES, PET_TYPES_EN } from 'components/Chips/constants';
import useAutoFocus from 'hooks/useAutoFocus';
import { TITLES, INFO_MESSAGES } from './constants';
import PetRegistrationSection from './PetRegistrationSection';
import { usePetRegistration } from '../../contexts/PetRegistrationContext';
import { useSelector } from 'react-redux';

function PetTypeSection() {
  const miscInputRef = useRef(null);
  const { t } = useTranslation();
  const { lng } = useSelector((state) => state.common);
  const { mandatoryData, setMandatoryData } = usePetRegistration();

  const [selectedType, setSelectedType] = useState(mandatoryData.species);
  const [miscValue, setMiscValue] = useState('');
  const [isMiscValueInvalid, setIsMiscValueInvalid] = useState(false);

  const handleChipSelect = (value) => {
    setSelectedType(value);

    if (value !== '기타') {
      setMiscValue('');
      setMandatoryData({ ...mandatoryData, species: value });
    }
  };

  const handleMiscInputChange = ({ target }) => {
    setMiscValue(target.value);
  };

  const handleMiscInputBlur = () => {
    if (selectedType === '기타' && miscValue) {
      setMandatoryData({ ...mandatoryData, species: miscValue });
    }
  };

  useEffect(() => {
    const role =
      lng === 'ko'
        ? PET_TYPES.find((t) => t.NAME === mandatoryData.species)
        : PET_TYPES_EN.find((t) => t.NAME === mandatoryData.species);

    if (role) {
      setSelectedType(mandatoryData.species);
    } else if (mandatoryData.species) {
      setSelectedType('기타');
      setMiscValue(mandatoryData.species);
    }
  }, [mandatoryData]);

  useEffect(() => {
    if (miscValue.length === 0 || miscValue.length > 10) {
      setIsMiscValueInvalid(true);
    } else {
      setIsMiscValueInvalid(false);
    }
  }, [miscValue]);

  const shouldFocus = selectedType === '기타';
  useAutoFocus(shouldFocus, miscInputRef);

  return (
    <PetRegistrationSection title={TITLES.PET_TYPES}>
      <Chips
        attributes={lng === 'ko' ? PET_TYPES : PET_TYPES_EN}
        selectedChips={selectedType ? [selectedType] : []}
        onChipSelect={handleChipSelect}
      />
      {selectedType === '기타' ? (
        <>
          <MiscInput
            ref={miscInputRef}
            isInvalid={isMiscValueInvalid}
            value={miscValue}
            onChange={handleMiscInputChange}
            onBlur={handleMiscInputBlur}
          />
          <InputAlert
            message={INFO_MESSAGES.ENTER_WITHIN_10_CHARS}
            isVisible={isMiscValueInvalid}
          />
        </>
      ) : (
        <Chip
          value={t('register.etc')}
          onClick={() => handleChipSelect('기타')}
        />
      )}
    </PetRegistrationSection>
  );
}

export default PetTypeSection;
