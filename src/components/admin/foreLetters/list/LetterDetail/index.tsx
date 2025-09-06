/* eslint-disable */

import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import apiRequest from 'api';
import ForeLetterDetailForm from './LetterDetailForm';
import LetterDetailModal from './LetterDetailModal';
import { getAdminLetterDetail } from 'api/letter';

function LetterDetail() {
  const location = useLocation();
  console.log(location);
  const { letter, pet, user } = location.state;

  const [selectedLetterId, setSelectedLetterId] = useState(0);
  const [selectedLetterData, setSelectedLetterData] = useState<any>(null);

  const fetchLetterDetail = async (id: number | string) => {
    const res = await apiRequest.get(
      `/api/admins/pet-initiated-letters/${id}?user-id=${user.id}&pet-id=${pet.id}`
    );

    return {
      letter: res.data.petInitiatedLetterDetailResponse,
      letters: res.data.petInitiatedLettersForAdminResponse,
      user: res.data.userForAdminResponse,
      pet: res.data.petForAdminResponse,
    };
  };

  const handleUserLetterClick = async (id: number) => {
    setSelectedLetterId(id);

    if (!!id) {
      const res = await fetchLetterDetail(id);
      setSelectedLetterData(res);
    }
  };

  if (!location.state) {
    return null;
  }

  return (
    <>
      <ForeLetterDetailForm
        letterId={letter.id}
        letterData={location.state}
        onLetterClick={handleUserLetterClick}
      />
      {!!selectedLetterData && !!selectedLetterId && (
        <LetterDetailModal
          letterId={selectedLetterId}
          letterData={selectedLetterData}
          onLetterClick={handleUserLetterClick}
        />
      )}
    </>
  );
}

export default LetterDetail;
