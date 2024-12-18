import { Link } from 'react-router-dom';

import NewYear from '../../assets/im_contents_newYear.webp';

export default function EventSection() {
  return (
    <section className="px-[18px] py-[30px]">
      <h2 className="text-[18px] font-bold leading-[18px]">무지개편지 소식</h2>
      <p className="mt-3 text-[14px] font-[400] leading-[21px] text-gray-1">
        이벤트, 공지 등을 무지개편지 카카오톡 채널에서 확인해보세요
      </p>
      <Link to="http://pf.kakao.com/_MNevG/107831244" target="_blank">
        <img
          src={NewYear}
          alt="event-image"
          className="mt-3 h-[265px] w-[354px] rounded-[16px]"
        />
      </Link>
    </section>
  );
}
