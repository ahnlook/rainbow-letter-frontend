import { useState, useEffect, useRef } from 'react';

import Chips from 'components/Chips';
import Chip from 'components/Chips/Chip';
import MiscInput from 'components/Input/MiscInput';
import InputAlert from 'components/InputAlert';
import {
  ROLES_FOR_WOMEN,
  ROLES_FOR_MEN,
  ROLES_FOR_EN,
} from 'components/Chips/constants';
import useAutoFocus from 'hooks/useAutoFocus';
import { TITLES, INFO_MESSAGES } from './constants';
import PetRegistrationSection from './PetRegistrationSection';
import { usePetRegistration } from '../../contexts/PetRegistrationContext';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ALL_ROLES = [...ROLES_FOR_MEN, ...ROLES_FOR_WOMEN];

function RoleForPetSection() {
  const miscInputRef = useRef(null);
  const { lng } = useSelector((state) => state.common);
  const { t } = useTranslation();
  const { mandatoryData, setMandatoryData } = usePetRegistration();
  const [selectedRole, setSelectedRole] = useState(null);
  const [miscValue, setMiscValue] = useState('');
  const [isMiscValueInvalid, setIsMiscValueInvalid] = useState(false);

  const shouldFocus = selectedRole === '기타';
  useAutoFocus(shouldFocus, miscInputRef);

  const handleChipSelect = (value) => {
    setSelectedRole(value);
    if (value !== '기타') {
      setMiscValue('');
      setMandatoryData({ ...mandatoryData, owner: value });
    }
  };

  const handleMiscInputChange = ({ target }) => {
    setMiscValue(target.value);
  };

  const handleMiscInputBlur = () => {
    if (selectedRole === '기타') {
      setMandatoryData({ ...mandatoryData, owner: miscValue });
    }
  };

  useEffect(() => {
    const role =
      lng === 'ko'
        ? ALL_ROLES.find((t) => t.NAME === mandatoryData.owner)
        : ROLES_FOR_EN.find((t) => t.NAME === mandatoryData.owner);

    if (role) {
      setSelectedRole(mandatoryData.owner);
    } else if (mandatoryData.owner) {
      setSelectedRole('기타');
      setMiscValue(mandatoryData.owner);
    }
  }, [mandatoryData.owner]);

  useEffect(() => {
    if (miscValue.length === 0 || miscValue.length > 10) {
      setIsMiscValueInvalid(true);
    } else {
      setIsMiscValueInvalid(false);
    }
  }, [miscValue]);

  return (
    <PetRegistrationSection
      title={TITLES.ROLES_FOR_PETS}
      description={lng !== 'ko'}
    >
      <Chips
        attributes={lng === 'ko' ? ROLES_FOR_WOMEN : ROLES_FOR_EN}
        selectedChips={selectedRole ? [selectedRole] : []}
        onChipSelect={handleChipSelect}
      />
      {lng === 'ko' && (
        <Chips
          attributes={ROLES_FOR_MEN}
          selectedChips={selectedRole ? [selectedRole] : []}
          onChipSelect={handleChipSelect}
        />
      )}

      {selectedRole === '기타' ? (
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
          onClick={() => setSelectedRole('기타')}
        />
      )}
    </PetRegistrationSection>
  );
}

export default RoleForPetSection;
