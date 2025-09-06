import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { formatDateToYYDDMM } from 'utils/date';

import { adminForeLetterActions } from 'store/admin/foreLetters/letters-slice';
import { letterUiActions } from 'store/admin/foreLetters/letterUi-slice';
// import { fetchLetter } from '../../../../store/admin/foreLetters/letters-actions';
import apiRequest from '../../../../../api';

export const replyStatusInfo = {
  생성예정: 'bg-yellow-400',
  발송대기: 'bg-blue-700',
  발송성공: 'bg-green-600',
  // 발송실패: 'bg-red-700',
};

function TableRow({ no, letter, isChecked }) {
  const {
    id,
    userEmail: email,
    summary,
    createdAt,
    submitTime,
    status,
    userId,
    petId,
    isPetInitiatedLetterEnabled,
  } = letter;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRowCheck = () => {
    dispatch(adminForeLetterActions.toggleLetterCheck(id));
  };

  const handleReplyClick = async () => {
    const res = await apiRequest.get(
      `/api/admins/pet-initiated-letters/${id}?user-id=${userId}&pet-id=${petId}`
    );

    if (res.status === 200) {
      navigate(`/admin/fore-letters/${id}`, {
        state: {
          letter: res.data.petInitiatedLetterDetailResponse,
          letters: res.data.petInitiatedLettersForAdminResponse,
          user: res.data.userForAdminResponse,
          pet: res.data.petForAdminResponse,
        },
      });
    }
  };

  const replyStatus = getReplyStatus(status);

  return (
    <tr className="border-b">
      <td className="border p-2">
        <div className="flex h-full items-center justify-center truncate">
          <input
            className="form-checkbox size-5"
            type="checkbox"
            checked={isChecked}
            onChange={handleRowCheck}
          />
        </div>
      </td>
      <td className="border p-2 text-center">{no}</td>
      <td className="border p-2">
        <button
          className="w-full truncate text-left"
          type="button"
          onClick={handleReplyClick}
        >
          {summary}
        </button>
      </td>
      <td className="border p-2 text-center">
        <div
          className={`rounded py-1 text-white ${replyStatusInfo[replyStatus]}`}
        >
          {replyStatus}
        </div>
      </td>
      <td className="border p-2 text-center">{email}</td>
      <td className="border p-2 text-center">
        {isPetInitiatedLetterEnabled ? 'ON' : 'OFF'}
      </td>
      <td className="border p-2 text-center">
        {createdAt && formatDateToYYDDMM(createdAt)}
      </td>
      <td className="border p-2 text-center">
        {submitTime && formatDateToYYDDMM(submitTime)}
      </td>
    </tr>
  );
}

export default TableRow;

export function getReplyStatus(replyStatus) {
  switch (replyStatus) {
    case 'SCHEDULED':
      return '생성예정';
    case 'READY_TO_SEND':
      return '발송대기';
    case 'SENT':
      return '발송성공';
  }
}
