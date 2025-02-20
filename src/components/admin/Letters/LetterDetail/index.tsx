/* eslint-disable */

import { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import apiRequest from 'api';
import LetterDetailForm from './LetterDetailForm';
import LetterDetailModal from './LetterDetailModal';
import { getAdminLetterDetail } from '../../../../api/letter';

function LetterDetail() {
  const location = useLocation();
  const { letter, pet, user } = location.state;

  const [selectedLetterId, setSelectedLetterId] = useState(0);
  const [selectedLetterData, setSelectedLetterData] = useState<any>(null);

  const fetchLetterDetail = async (id: number | string) => {
    const res = await apiRequest.get(
      `/api/admins/letters/${id}?user=${user.id}&pet=${pet.id}`
    );

    return res.data;
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
      <LetterDetailForm
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
