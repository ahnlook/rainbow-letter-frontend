import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import {
  calculateDDay,
  formatDateToYYMMDDHHSS,
  formatDateToYYMMDD,
} from 'utils/date';
import { extractFirstTenChars } from 'utils/string';
import defaultImage from 'assets/Logo_256px.png';
import {
  editReply,
  regenerateReply,
} from '../../../../store/admin/letters-actions';
import { getReplyStatus, replyStatusInfo } from '../LetterTable/TableRow';
import { getImage } from 'api/images';

const MAX_CONTENT_LENGTH = 1000;

function LetterDetailForm({
  letterId,
  letterData,
  isModal = false,
  onLetterClick,
}) {
  const [newContent, setNewContentValue] = useState({
    promptA: '',
    promptB: '',
  });
  const [selectedPrompt, setSelectedPrompt] = useState('promptA');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, pet, letter, reply, recent } = letterData;
  const isPromptA = selectedPrompt === 'promptA';

  const handleAiOptionToggle = (option) => {
    setSelectedPrompt(option);
  };

  const handleRegenerateClick = () => {
    if (reply?.submitTime) return alert('이미 답장을 보낸 편지입니다.');
    dispatch(regenerateReply(letter.id));
  };

  const handleSaveClick = () => {
    if (reply?.submitTime) return alert('이미 답장을 보낸 편지입니다.');

    const newSummary = extractFirstTenChars(
      isPromptA ? newContent.promptA : newContent.promptB
    );
    dispatch(
      editReply({
        replyId: reply?.id,
        editedReply: {
          promptType: isPromptA ? 'A' : 'B',
          summary: newSummary,
          content: isPromptA ? newContent.promptA : newContent.promptB,
        },
      })
    );
    navigate('/admin/letters/');
  };

  const handleUserLetterClick = (id) => {
    onLetterClick(id);
  };

  useEffect(() => {
    if (reply && (reply?.promptA || reply?.promptB)) {
      setNewContentValue({ promptA: reply?.promptA, promptB: reply?.promptB });
    }
  }, [reply?.promptA, reply?.promptB]);

  useEffect(() => {
    setSelectedPrompt(reply?.promptType);
  }, [reply?.promptType]);

  if (!letterData) {
    return <div>Loading...</div>;
  }

  const replyStatus = getReplyStatus(reply?.status, reply?.inspectionTime);

  return (
    <div
      className={`flex h-[calc(100vh-66px)] min-h-[250%] flex-col gap-6 overflow-auto bg-white px-2 pb-10 sm:min-h-0 sm:flex-row sm:gap-x-4 ${isModal && 'pt-10'}`}
    >
      {/* 왼쪽 */}
      <section className="flex flex-1 flex-col gap-y-6 bg-white">
        <header>
          <div className="bg-gray-100 p-2">
            <span>회원 정보</span>
          </div>
          <div className="flex justify-between p-2 text-gray-500">
            <div className="flex gap-x-10">
              <div className="flex flex-col gap-y-1">
                <span className="whitespace-nowrap">아이디</span>
                <span className="whitespace-nowrap">핸드폰번호</span>
                <span className="whitespace-nowrap">가입일</span>
                <span className="whitespace-nowrap">편지회차</span>
                <span className="whitespace-nowrap">마지막 로그인</span>
              </div>
              <div className="flex flex-col gap-y-1">
                <span className="whitespace-nowrap">{user.email}</span>
                <span className="whitespace-nowrap">
                  {user.phoneNumber || '-'}
                </span>
                <span className="whitespace-nowrap">
                  {formatDateToYYMMDD(user.createdAt)}
                </span>
                <span className="whitespace-nowrap">{user.count}</span>
                <span className="whitespace-nowrap">
                  {formatDateToYYMMDD(letter.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="bg-gray-100 p-2">
            <span>최근 편지 리스트</span>
          </div>
          <div className="text-[10px]">
            <table className="w-full">
              <thead>
                <tr>
                  <th>회차</th>
                  <th>받는이</th>
                  <th>편지내용</th>
                  <th>상태</th>
                  <th>등록일</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((row) => {
                  const replyStatus = getReplyStatus(
                    row.status,
                    row.inspection
                  );
                  const isSelected = row.id === Number(letterId);
                  return (
                    <tr
                      key={row.id}
                      className={`cursor-pointer hover:bg-gray-100 ${isSelected && 'font-semibold text-blue-600'}`}
                      onClick={() => handleUserLetterClick(row.id)}
                    >
                      <td className="text-center">{row.number}</td>
                      <td className="whitespace-nowrap text-center">
                        {row.petName}
                      </td>
                      <td className="truncate whitespace-nowrap text-center">
                        {row.summary}
                      </td>
                      <td
                        className={`whitespace-nowrap text-center text-white ${replyStatusInfo[replyStatus]}`}
                      >
                        {replyStatus}
                      </td>
                      <td className="whitespace-nowrap text-center">
                        {formatDateToYYMMDD(row.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </section>

      {/* 가운데 */}
      <section className="flex flex-[2] flex-col gap-y-5 bg-white">
        <header>
          <div className="bg-gray-100 p-2">
            <span>반려동물 정보</span>
          </div>
          <div className="flex justify-between p-2 text-gray-500">
            <div className="flex gap-x-10">
              <div className="flex flex-col gap-y-1">
                <span className="whitespace-nowrap">이름</span>
                <span className="whitespace-nowrap">관계</span>
                <span className="whitespace-nowrap">종류</span>
                <span className="whitespace-nowrap">성격</span>
                <span className="whitespace-nowrap">기일</span>
              </div>
              <div className="flex flex-col gap-y-1">
                <span>{pet.name}</span>
                <span>{pet.owner}</span>
                <span>{pet.species}</span>
                <span>
                  {pet.personalities.length > 0
                    ? pet.personalities.join(', ')
                    : '-'}
                </span>
                <div className="flex gap-x-1">
                  {pet.deathAnniversary && (
                    <>
                      <span>{pet.deathAnniversary}</span>
                      <span>({calculateDDay(pet.deathAnniversary)})</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="">
              <img
                className="size-[132px]"
                src={pet.image ? getImage(pet.image) : defaultImage}
                alt={pet.name}
              />
            </div>
          </div>
        </header>
        <main className="flex grow flex-col gap-y-3 sm:p-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-2">
              <span className="text-[20px] font-bold">
                {letter.number}회차 편지
              </span>
              {letter.image && (
                <Link
                  className="text-primary underline"
                  to={getImage(letter.image)}
                  target="_blank"
                >
                  (사진보기)
                </Link>
              )}
            </div>
            <span>등록일 {formatDateToYYMMDDHHSS(letter.createdAt)}</span>
          </div>
          <div className="flex grow rounded bg-gray-100 p-3">
            {letter.content}
          </div>
        </main>
      </section>

      {/* 오른쪽 */}
      <section className="flex h-full flex-[2] flex-col gap-y-2">
        <header className="flex w-full justify-between">
          <div className="flex items-center gap-x-2">
            <span className="text-[20px] font-bold">답장 작성</span>
            <div
              className={`flex items-center rounded px-1 text-white ${replyStatusInfo[replyStatus]}`}
            >
              <span>{replyStatus}</span>
            </div>
          </div>
          <div className="flex flex-col">
            {!!reply?.inspectionTime && (
              <span>
                검수일 {formatDateToYYMMDDHHSS(reply?.inspectionTime)}
              </span>
            )}
            {!!reply?.submitTime && (
              <span>발송일 {formatDateToYYMMDDHHSS(reply?.submitTime)}</span>
            )}
          </div>
        </header>
        <div className="relative flex w-full items-center justify-between overflow-hidden rounded border border-yellow-50 bg-white">
          <div
            className={`absolute top-0 h-full w-1/2 bg-yellow-50 transition-transform duration-300 ease-in-out ${
              selectedPrompt === 'promptA'
                ? 'translate-x-0'
                : 'translate-x-full'
            }`}
          />
          <button
            className={`z-10 w-1/2 py-1 text-center ${
              isPromptA ? 'font-semibold text-black' : 'text-gray-500'
            }`}
            onClick={() => handleAiOptionToggle('promptA')}
          >
            prompt A
          </button>
          <button
            className={`z-10 w-1/2 py-1 text-center ${
              isPromptA ? 'text-gray-500' : 'font-semibold text-black'
            }`}
            onClick={() => handleAiOptionToggle('promptB')}
          >
            prompt B
          </button>
        </div>
        <main className="flex h-[80vh] grow">
          <textarea
            className="w-full resize-none rounded-lg bg-gray-100 p-5"
            maxLength={MAX_CONTENT_LENGTH}
            disabled={reply?.submitTime}
            value={isPromptA ? newContent.promptA : newContent.promptB}
            onChange={({ target }) =>
              setNewContentValue(
                isPromptA
                  ? { ...newContent, promptA: target.value }
                  : { ...newContent, promptB: target.value }
              )
            }
          />
        </main>
        <footer className="flex justify-between">
          <div className="mr-3 text-solo-label text-gray-1">
            {`${isPromptA ? newContent.promptA.length : newContent.promptB.length} / ${MAX_CONTENT_LENGTH}`}
          </div>
          {isModal ? (
            <button
              className="rounded bg-gray-300 px-5 py-2 font-semibold text-white"
              type="button"
              onClick={() => onLetterClick(0)}
            >
              닫기
            </button>
          ) : (
            <div className="flex gap-x-2">
              <button
                className={`rounded px-3 py-2 font-semibold ${
                  reply?.submitTime
                    ? 'cursor-not-allowed'
                    : 'bg-pink-300 hover:bg-pink-400'
                }`}
                type="button"
                disabled={reply?.submitTime}
                onClick={handleRegenerateClick}
              >
                GPT 재생성
              </button>
              <button
                className={`rounded bg-green-500 px-3 py-2 font-semibold text-white hover:bg-green-400`}
                type="button"
                onClick={handleSaveClick}
              >
                저장
              </button>
            </div>
          )}
        </footer>
      </section>
    </div>
  );
}

export default LetterDetailForm;
