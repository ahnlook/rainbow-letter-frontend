import { useNavigate } from 'react-router-dom';

export default function ReplyInfoModalForEn() {
  const navigate = useNavigate();

  const onClickConfirm = () => {
    navigate('/letter-box');
  };

  const onClickDontShowButton = () => {
    localStorage.setItem('unshow', 'true');
    navigate('/letter-box');
  };

  return (
    <div className="w-full px-4 pb-6 pt-[54px]">
      <header className="flex flex-col items-center justify-center text-center">
        <h3 className="whitespace-pre-wrap text-heading-3 font-bold">
          We’ll send you an email
        </h3>
        <h3 className="whitespace-pre-wrap text-nowrap text-heading-3 font-bold">
          notification when a reply arrives!
        </h3>
        <span className="mt-4 text-[14px] leading-[19px] text-[#424242]">
          The Rainbow Post Office HQ is located in Korea. To receive a reply at
          10:00 AM KST the next day, please make sure to send your letter by
          11:59 PM KST.
        </span>
      </header>
      <button
        onClick={onClickConfirm}
        className="mt-6 w-full rounded-[15px] bg-[#FFB74D] py-4 text-[20px] leading-[26px] text-white"
      >
        Ok, got it
      </button>
      <p className="mt-4 text-center text-[14px] text-[#616161] underline">
        <span
          onClick={onClickDontShowButton}
          className="cursor-pointer text-[14px] text-[#616161] underline"
        >
          Don’t show this message again
        </span>
      </p>
    </div>
  );
}
