import AppBar from 'components/Donate/AppBar';
import { MODAL_AD_CONTENTS_ITEMS } from 'components/Modal/constants';
import ContentsItem from 'components/Home/ContentsItem';

import WritingPad from '../../assets/writing_pad.svg';
import { Link } from 'react-router-dom';

export default function AdModal() {
  return (
    <div className="w-full pt-[3.313rem]">
      <header className="flex flex-col items-center justify-center rounded-[0.938rem] bg-orange-50 py-6 text-center">
        <img
          src={WritingPad}
          alt="편지지"
          className="h-[1.125rem] w-[1.625rem]"
        />
        <h3 className="mt-2 text-heading-3">편지가 출발했어요</h3>
        <span className="mt-2">답장은 다음날 오전 10시에 도착해요</span>
      </header>
      <p className="mb-4 mt-[1.625rem] text-gray-1 underline">AD</p>
      <div className="flex flex-col gap-4">
        <AppBar />
        {/* {MODAL_AD_CONTENTS_ITEMS.map((item) => (
          <ContentsItem item={item} className={item?.className} />
        ))} */}
      </div>
    </div>
  );
}
