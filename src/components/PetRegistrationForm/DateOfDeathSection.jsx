import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Chip from 'components/Chips/Chip';
import Input from 'components/Input';
import InputAlert from 'components/InputAlert';
import { validateDateInput, isActualDate } from 'utils/validators';
import { isFutureDate } from 'utils/date';
import { TITLES, DATE_OF_DEATH, INFO_MESSAGES } from './constants';
import { usePetRegistration } from '../../contexts/PetRegistrationContext';
import PetRegistrationSection from './PetRegistrationSection';

function DateOfDeathSection() {
  const { t } = useTranslation();
  const { lng } = useSelector((state) => state.common);
  const { mandatoryData, setMandatoryData } = usePetRegistration();
  const [date, setDate] = useState(mandatoryData.deathAnniversary);
  const [isDateInFuture, setIsDateInFuture] = useState(false);
  const [isDateValid, setIsDateValid] = useState(true);
  const isChipSelected = date === null;

  const handleInputChange = (field) => (event) => {
    const { value } = event.target;
    if (!validateDateInput(value, field)) {
      return;
    }
    const updatedDate = { ...date, [field]: value };
    setDate(updatedDate);

    if (updatedDate.year && updatedDate.month && updatedDate.day) {
      const isValid = isActualDate(
        updatedDate.year,
        updatedDate.month,
        updatedDate.day
      );
      setIsDateValid(isValid);
      if (isValid) {
        setIsDateInFuture(isFutureDate(updatedDate));
      }
    } else {
      setIsDateValid(true);
    }
  };

  const handleChipClick = () => {
    setDate(date ? null : { year: '', month: '', day: '' });
  };

  useEffect(() => {
    if ((date?.year && date?.month && date?.day) || !date) {
      setMandatoryData({ ...mandatoryData, deathAnniversary: date });
      setIsDateInFuture(date ? isFutureDate(date) : false);
    }
  }, [date]);

  useEffect(() => {
    setDate(mandatoryData.deathAnniversary);
  }, [mandatoryData]);

  return (
    <PetRegistrationSection title={TITLES.DATE_OF_DEATH}>
      <div className="flex justify-between">
        <div className="flex flex-row-reverse items-center">
          <Input
            className="h-11 w-[4.063rem] text-center text-caption"
            type="tel"
            placeholder="YYYY"
            value={date?.year || ''}
            onChange={handleInputChange('year')}
          />
          {lng === 'ko' ? (
            <span className="p-[0.437rem] text-caption">
              {DATE_OF_DEATH.YEAR}
            </span>
          ) : (
            <span className="p-[0.437rem] text-caption">/</span>
          )}

          <Input
            className="h-11 w-[3.437rem] text-center text-caption"
            type="tel"
            placeholder="MM"
            value={date?.month || ''}
            onChange={handleInputChange('month')}
          />
          {lng === 'ko' ? (
            <span className="p-[0.437rem] text-caption">
              {DATE_OF_DEATH.MONTH}
            </span>
          ) : (
            <span className="p-[0.437rem] text-caption">/</span>
          )}
          <Input
            className="h-11 w-[3.437rem] text-center text-caption"
            type="tel"
            placeholder="DD"
            value={date?.day || ''}
            onChange={handleInputChange('day')}
          />
          <span
            className={lng === 'ko' ? 'p-[0.437rem] text-caption' : 'hidden'}
          >
            {DATE_OF_DEATH.DAY}
          </span>
        </div>
        <div className="flex items-center text-nowrap">
          <Chip
            value={t(DATE_OF_DEATH.UNKNOWN)}
            isSelected={isChipSelected}
            onClick={handleChipClick}
          />
        </div>
      </div>
      <InputAlert
        message={INFO_MESSAGES.CHECK_DATE_AGAIN}
        isVisible={isDateInFuture || !isDateValid}
      />
    </PetRegistrationSection>
  );
}

export default DateOfDeathSection;
